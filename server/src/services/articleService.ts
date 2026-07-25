import { prisma } from "../prisma.js"
import { ArticleCategory } from "../../generated/prisma/client.js";
import { ArticleBody } from "../interfaces/article.js";

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

    getAll() {
        return prisma.article.findMany();
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