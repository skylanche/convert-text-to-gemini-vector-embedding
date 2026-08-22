import express, { Request, Response } from "express";
import createEmbedding from "../services/gemini.js";
import { rateLimit } from "express-rate-limit";


export const embeddingRouter = express.Router();

const embeddingLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later."
  }
});


embeddingRouter.post("/embed", embeddingLimiter, async (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                error: "Text is required"
            });
        }

        const embedding = await createEmbedding(text);

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