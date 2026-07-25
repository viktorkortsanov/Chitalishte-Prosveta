const API_URL = "http://localhost:3000";

export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
