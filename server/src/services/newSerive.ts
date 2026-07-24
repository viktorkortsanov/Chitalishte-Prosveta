import { prisma } from "../prisma.js"
import { News } from "../../generated/prisma/client.js"

export const newsService = {
    async create(title: string, imageUrl: string, text: string) {
        const news = await prisma.news.create({
            data: {
                title,
                imageUrl,
                text
            }
        })
    }
}