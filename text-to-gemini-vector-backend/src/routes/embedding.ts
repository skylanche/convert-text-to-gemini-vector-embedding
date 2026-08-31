import express, { Request, Response } from "express";
import createEmbedding from "../services/gemini.js";
import storeEmbeddingInDB from "../services/db.js";

export const embeddingRouter = express.Router();


embeddingRouter.post("/embed", async (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                error: "Text is required"
            });
        }

        const embedding = await createEmbedding(text);

        if(embedding){
            await storeEmbeddingInDB(text, embedding);
        }

        res.json({
            text,
            embedding
        });
    } catch (error) {
        console.error("Error generating embedding:", error);

        res.status(500).json({
            success: false,
            error: "Failed to generate embedding"
        });
    }
});