import express, { type Express, Request, Response } from 'express'
import cors from "cors"
import { embeddingRouter } from './routes/embedding.js'
import { rateLimit } from "express-rate-limit";

const PORT = Number(process.env.PORT) || 8000


const app: Express = express()

app.set("trust proxy", 1)

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://convert-text-to-gemini-vector-embedding-1.onrender.com"
  ]
}))
app.use(express.json());

app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later."
  }
}), embeddingRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})


app.listen(PORT, "0.0.0.0", () => {console.log(`Server running on port ${PORT}`);})
