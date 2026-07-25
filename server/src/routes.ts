import { Router } from "express";
import authController from "./controllers/authController.js";
import articleController from "./controllers/articleController.js";

const routes = Router();

routes.use(authController);
routes.use(articleController);

export default routes;