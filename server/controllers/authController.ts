import { Router, Request, Response } from "express";
import { RegisterBody } from "../interfaces/auth.js";
import { authService } from "../services/authService.js";

const authController = Router();

//Request<Params, ResBody, ReqBody, Query>

authController.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { username, email, password, rePassword } = req.body;

    try {
        const { token, user } = await authService.register(username, email, password, rePassword);
        res.cookie(process.env.AUTH_COOKIE_NAME as string, token, { httpOnly: true });
        res.status(200).json({ user: { id: user.id, email: user.email } });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred";
        res.status(400).json({ err: message });
    }
})

export default authController;