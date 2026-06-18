const API_URL = "http://localhost:3000";

export interface AuthUser {
    id: string;
    username: string;
    email: string;
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

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.err ?? data.message ?? "Грешка от сървъра.");
    }

    return data;
}

export const authService = {
    login(payload: LoginPayload): Promise<AuthResponse> {
        return request("/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    register(payload: RegisterPayload): Promise<AuthResponse> {
        return request("/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    logout(): Promise<void> {
        return request("/logout");
    },

    getCurrentUser(): Promise<AuthResponse> {
        return request("/me");
    },
};