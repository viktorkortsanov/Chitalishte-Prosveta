import { prisma } from "../prisma.js"
import { ArticleBody } from "../interfaces/article.js";

export const articleService = {
    create(title: string, imageUrl: string, text: string) {
        return prisma.article.create({
            data: {
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