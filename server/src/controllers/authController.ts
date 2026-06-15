import { Router, Request, Response } from "express";
import { LoginBody, RegisterBody } from "../interfaces/auth.js";
import { authService } from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.post("/register", isGuest, async (req: Request<{}, {}, RegisterBody>, res: Response) => {
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
});

authController.post("/login", isGuest, async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await authService.login(email, password);
        res.cookie(process.env.AUTH_COOKIE_NAME as string, token, { httpOnly: true });
        res.status(200).json({ user: { id: user.id, email: user.email } });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred";
        res.status(400).json({ err: message });
    }
});

authController.get("/logout", isAuth, (req, res) => {
    res.clearCookie(process.env.AUTH_COOKIE_NAME as string);
    res.status(200).json({ message: 'Logged out successfully' });
})

export default authController;