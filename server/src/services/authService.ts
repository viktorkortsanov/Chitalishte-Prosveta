import crypto from 'crypto'
import { User } from "../../generated/prisma/client.js"
import { prisma } from "../prisma.js"
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { emailService } from "./emailService.js"

const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export const authService = {
    async register(username: string, email: string, password: string, rePassword: string) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { username: username },],
            },
        });

        if (user) {
            throw new Error('User already exists!');
        }

        if (password !== rePassword) {
            throw new Error('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                verificationToken,
                verificationTokenExpiresAt: new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS),
            }
        });

        await emailService.sendVerificationEmail(newUser.email, verificationToken);

        return {
            message: "Регистрацията е успешна. Моля, проверете имейла си, за да потвърдите акаунта си."
        }
    },

    async login(email: string, password: string) {

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error("Invalid user");
        }

        const isValidUser = await bcrypt.compare(password, user.password);

        if (!isValidUser) {
            throw new Error("Invalid email or password")
        }

        if (!user.emailVerified) {
            throw new Error("Моля, потвърдете имейла си преди да влезете.")
        }

        const token = await this.generateToken(user);

        return {
            token,
            user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin }
        }
    },

    async verifyEmail(token: string) {
        const user = await prisma.user.findUnique({
            where: { verificationToken: token }
        });

        if (!user || !user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < new Date()) {
            throw new Error("Линкът за потвърждение е невалиден или изтекъл.");
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null,
            }
        });

        return { message: "Имейлът е потвърден успешно. Вече можете да влезете." };
    },

    async generateToken(user: User) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
        return token;
    },
}