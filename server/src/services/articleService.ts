import { prisma } from "../prisma.js"
import { ArticleCategory, Prisma } from "../../generated/prisma/client.js";
import { ArticleBody } from "../interfaces/article.js";

export interface GetAllOptions {
    category?: ArticleCategory;
    search?: string;
    page?: number;
    limit?: number;
}

export const articleService = {
    create(category: ArticleCategory, title: string, imageUrl: string, text: string) {
        return prisma.article.create({
            data: {
                category,
                title,
                imageUrl,
                text
            }
        });
    },

    async getAll({ category, search, page, limit }: GetAllOptions = {}) {
        const where: Prisma.ArticleWhereInput = {
            ...(category ? { category } : {}),
            ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
        };

        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                orderBy: { createdAd: "desc" },
                ...(limit ? { take: limit } : {}),
                ...(page && limit ? { skip: (page - 1) * limit } : {}),
            }),
            prisma.article.count({ where }),
        ]);

        return { articles, total };
    },

    getOne(articleId: string) {
        return prisma.article.findUnique({ where: { id: articleId } });
    },

    edit(articleId: string, articleData: ArticleBody) {
        return prisma.article.update({
            where: { id: articleId },
            data: {
                category: articleData.category,
                title: articleData.title,
                imageUrl: articleData.imageUrl,
                text: articleData.text
            }
        });
    },

    delete(articleId: string) {
        return prisma.article.delete({ where: { id: articleId } });
    }
}