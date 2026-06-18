import "dotenv/config";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(routes);

app.listen(3000, () => console.log('Server is listening on port 3000'))