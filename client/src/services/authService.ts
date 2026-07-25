import { request } from "./requester";

export interface AuthUser {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    rePassword: string;
}

interface AuthResponse {
    user: AuthUser;
}

export const authService = {
    login(payload: LoginPayload): Promise<AuthResponse> {
        return request("/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    register(payload: RegisterPayload): Promise<{ message: string }> {
        return request("/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    verifyEmail(token: string): Promise<{ message: string }> {
        return request("/verify-email", {
            method: "POST",
            body: JSON.stringify({ token }),
        });
    },

    logout(): Promise<void> {
        return request("/logout");
    },

    getCurrentUser(): Promise<AuthResponse> {
        return request("/me");
    },
};