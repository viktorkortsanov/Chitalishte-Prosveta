import { User } from "../generated/prisma/client.js"
import { prisma } from "../src/prisma.js"
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

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

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const token = await this.generateToken(newUser);
        return {
            token,
            user: { id: newUser.id, email: newUser.email }
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

        const token = await this.generateToken(user);

        return {
            token,
            user: { id: user.id, email: user.email }
        }
    },

    async generateToken(user: User) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
        return token;
    },
}