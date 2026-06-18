import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
            isAuthenticated?: boolean;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[process.env.AUTH_COOKIE_NAME as string];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;
        next();
    } catch (err) {
        res.clearCookie(process.env.AUTH_COOKIE_NAME as string);
    }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: "User is not authenticated" });
    }

    next();
}

export const isGuest = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        return res.status(403).json({ message: "User is already authenticated" });
    }

    next();
}