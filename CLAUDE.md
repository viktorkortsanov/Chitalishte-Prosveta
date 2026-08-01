# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Website for Chitalishte Prosveta (a Bulgarian community center). UI copy and user-facing error messages are in Bulgarian. It's a two-package monorepo with no shared workspace tooling — `client` and `server` are independent npm projects with their own `node_modules`, run and built separately.

- `client/` — React 19 + TypeScript + Vite SPA
- `server/` — Express + TypeScript API, Prisma ORM over PostgreSQL

## Commands

All commands are run from within `client/` or `server/` respectively (there is no root `package.json`).

### client
```
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview   # preview production build
```

### server
```
npm run dev       # nodemon + ts-node, watches src/**/*.ts (http://localhost:3000)
npm run build     # tsc -> dist/
npm start         # node dist/src/index.js (run build first)
```

### Prisma (run from `server/`)
```
npx prisma migrate dev --name <name>   # create + apply a migration
npx prisma generate                     # regenerate client into server/generated/prisma
```
The generated Prisma client lives in `server/generated/prisma` (custom output path, not `node_modules/.prisma`), so imports use relative paths like `../generated/prisma/client.js`.

There are no test scripts configured in either package.

## Environment variables

Neither `.env` is committed. `server/.env` needs: `DATABASE_URL`, `JWT_SECRET`, `AUTH_COOKIE_NAME`, `EMAIL_USER`/`EMAIL_PASS` (Gmail SMTP, `EMAIL_PASS` must be an App Password), `CLIENT_URL`, `CLOUDINARY_CLOUD_NAME`/`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET`. `client/.env` needs `VITE_CLOUDINARY_CLOUD_NAME`/`VITE_CLOUDINARY_UPLOAD_PRESET` (Vite env vars, must be prefixed `VITE_`).

## Architecture

### API base URL and CORS
The client talks to the API via a hardcoded `API_URL = "http://localhost:3000"` in `client/src/services/requester.ts`. The server only allows CORS from `http://localhost:5173` (hardcoded in `server/src/index.ts`, `credentials: true`). Both sides assume default local dev ports — update both together if either changes.

### Auth model
- JWT is issued on login (`authService.login`) and set as an **httpOnly cookie** (name from `AUTH_COOKIE_NAME`), not sent in a response body/header.
- `authMiddleware` (`server/src/middlewares/authMiddleware.ts`) runs globally on every request, reads the cookie, and — if valid — attaches `req.user`/`req.isAuthenticated`. It does **not** reject unauthenticated requests itself.
- Route-level gating is opt-in via the `isAuth` / `isGuest` middlewares from the same file, applied per-route in controllers (e.g. `authController.post("/register", isGuest, ...)`).
- Article routes (`articleController.ts`) currently have no `isAuth` guard — creating/editing/deleting articles is not server-enforced as admin-only, even though the client only exposes those actions when `isAdmin` is true.
- On the client, `AuthContext` (`client/src/context/AuthContext.tsx`) fetches `/me` once on mount to hydrate `currentUser`, exposes `isAdmin`/`loading`/`logout`, and is consumed via the `useAuth()` hook. It does not itself update state after login/register — callers are expected to call `setCurrentUser` from `useAuth()`.

### Server request flow
`server/src/index.ts` wires global middleware in order: `cors` → `express.json` → `cookieParser` → `authMiddleware` → `routes`. `routes.ts` just mounts `authController` and `articleController` (each an Express `Router`) with no path prefix — full paths are declared inside each controller (e.g. `/login`, `/novini-i-sabitiya`). Controllers call into `services/` (`authService`, `articleService`, `emailService`), which talk to Prisma directly; there is no repository layer. Errors are caught per-route and mapped to status codes in the controller (see `handleError` in `articleController.ts` for the Prisma `P2025` → 404 pattern).

### Database (Prisma)
`server/src/prisma.ts` exports a single shared `PrismaClient` instance built with the `PrismaPg` driver adapter (`@prisma/adapter-pg`) over `DATABASE_URL`. Schema is `server/prisma/schema.prisma`: `User` (email/password auth, `isAdmin`, email verification token fields) and `Article` (`category`: `news` | `event`, `imageUrl`, `text`). Both models use `@@map` to snake_case table names (`users`, `articles`) while keeping camelCase in code.

### Client structure
- `services/requester.ts` — thin `fetch` wrapper (`request<T>()`) all other client services build on; always sends `credentials: "include"` and expects `{ err | message }` on failure.
- `services/*Service.ts` — one per API resource (`authService`, `articleService`), plus `uploadService.ts` which uploads images **directly from the browser to Cloudinary's unsigned upload API**, bypassing the Express server entirely; the resulting `secure_url` is then sent to the server as `imageUrl` when creating/editing an article.
- Routing is in `App.tsx` via `react-router` (`Routes`/`Route`), all under one `AppRoutes` component wrapped in `AuthProvider`. Article URLs use a `:slug` param name but the value passed is actually the article's `id` (see `ArticleDetails`/`EditArticle`).
- Components are organized by feature under `src/components/` (e.g. `Articles/{ArticlesMain,ArticleDetails,CreateArticle,EditArticle}`, `AuthForms/`, `MainContent/{HeroSection,AboutUsSection,ActivitySection,NewsSection}`), each with a co-located `.css` file — no CSS-in-JS or utility framework.
- React Compiler is enabled in `vite.config.ts` via `@rolldown/plugin-babel` + `reactCompilerPreset()`.
