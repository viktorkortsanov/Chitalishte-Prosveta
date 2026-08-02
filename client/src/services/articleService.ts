import { request } from "./requester"

interface ArticlePayload {
    title: string,
    category: "news" | "event",
    imageUrl?: string,
    text: string
}

export interface Article {
    id: string,
    title: string,
    category: "news" | "event",
    imageUrl: string | null,
    text: string,
    createdAd: string
}

export interface ArticlesQuery {
    category?: "news" | "event",
    search?: string,
    page?: number,
    limit?: number
}

export interface ArticlesResult {
    articles: Article[],
    total: number
}

export const articleService = {
    create(articleData: ArticlePayload) {
        return request<void>("/novini-i-sabitiya", {
            method: "POST",
            body: JSON.stringify(articleData)
        });
    },
    getAll(query: ArticlesQuery = {}) {
        const params = new URLSearchParams();
        if (query.category) params.set("category", query.category);
        if (query.search) params.set("search", query.search);
        if (query.page) params.set("page", String(query.page));
        if (query.limit) params.set("limit", String(query.limit));
        const qs = params.toString();
        return request<ArticlesResult>(`/novini-i-sabitiya${qs ? `?${qs}` : ""}`);
    },
    getOne(id: string) {
        return request<Article>(`/novini-i-sabitiya/${id}`);
    },
    edit(id: string, articleData: ArticlePayload) {
        return request<void>(`/novini-i-sabitiya/${id}`, {
            method: "PATCH",
            body: JSON.stringify(articleData)
        });
    },
    delete(id: string) {
        return request<void>(`/novini-i-sabitiya/${id}`, {
            method: "DELETE"
        });
    }
}