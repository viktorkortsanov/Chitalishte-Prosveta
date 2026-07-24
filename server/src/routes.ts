import { Router } from "express";
import authController from "./controllers/authController.js";
import newsController from "./controllers/newsController.js";

const routes = Router();

routes.use(authController);
routes.use(newsController);

export default routes;