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

export const articleService = {
    create(articleData: ArticlePayload) {
        return request<void>("/novini-i-sabitiya", {
            method: "POST",
            body: JSON.stringify(articleData)
        });
    }
}