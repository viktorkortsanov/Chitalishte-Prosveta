import { Router, Request, Response } from "express";
import { newsService } from "../services/newSerive.js";
import { NewsBody } from "../interfaces/news.js";

const newsController = Router();

newsController.post("/novini-i-sabitiya", async (req: Request<{}, {}, NewsBody>, res: Response) => {
    const { title, imageUrl, text } = req.body;

    try {
        const news = await newsService.create(title, imageUrl ?? "", text);
        res.status(201).json(news);
    }
    catch (err) {
        res.status(400).json({ err });
    }
});

export default newsController;