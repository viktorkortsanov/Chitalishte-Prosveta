import { Router, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { articleService } from "../services/articleService.js";
import { ArticleBody } from "../interfaces/article.js";

const articleController = Router();

function handleError(err: unknown, res: Response) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
        res.status(404).json({ message: "Article not found" });
        return;
    }

    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}

articleController.post("/novini-i-sabitiya", async (req: Request<{}, {}, ArticleBody>, res: Response) => {
    const { title, imageUrl, text } = req.body;

    try {
        await articleService.create(title, imageUrl ?? "", text);
        res.status(204).send();
    }
    catch (err) {
        handleError(err, res);
    }
});

articleController.get("/novini-i-sabitiya", async (req: Request, res: Response) => {
    try {
        const articles = await articleService.getAll();
        res.status(200).json(articles);
    }
    catch (err) {
        handleError(err, res);
    }
});

articleController.get("/novini-i-sabitiya/:articleId", async (req: Request, res: Response) => {
    try {
        const articleId = req.params.articleId as string;
        const article = await articleService.getOne(articleId);

        if (!article) {
            res.status(404).json({ message: "Article not found" });
            return;
        }

        res.status(200).json(article);
    }
    catch (err) {
        handleError(err, res);
    }
});

articleController.patch("/novini-i-sabitiya/:articleId", async (req: Request<{ articleId: string }, {}, ArticleBody>, res: Response) => {
    try {
        const articleId = req.params.articleId;
        await articleService.edit(articleId, req.body);
        res.status(204).send();
    }
    catch (err) {
        handleError(err, res);
    }
});

articleController.delete("/novini-i-sabitiya/:articleId", async (req: Request, res: Response) => {
    try {
        const articleId = req.params.articleId as string;
        await articleService.delete(articleId);
        res.status(204).send();
    }
    catch (err) {
        handleError(err, res);
    }
});

export default articleController;
