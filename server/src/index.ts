import "dotenv/config";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(3000, () => console.log('Server is listening on port 3000'))