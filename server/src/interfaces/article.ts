import { ArticleCategory } from "../../generated/prisma/client.js";

export interface ArticleBody {
    category: ArticleCategory,
    title: string,
    imageUrl?: string,
    text: string
};