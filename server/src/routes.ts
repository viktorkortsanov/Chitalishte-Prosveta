import { Router } from "express";
import authController from "../controllers/authController.js";

const routes = Router();

routes.use(authController);

export default routes;