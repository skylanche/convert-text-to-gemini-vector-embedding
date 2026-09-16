import fs from 'node:fs';
import pg from 'pg';
import 'dotenv/config';

type ClientConfig = { 
  user: string | undefined; 
  password: string | undefined; 
  host: string; 
  port: number | undefined;
  database: string;
  max?: number | undefined;
  idleTimeoutMillis?: number | undefined;
  ssl: { 
    rejectUnauthorized: boolean; 
    ca: string; 
  }; 
};

const config: ClientConfig = {
    user: process.env.PG_NAME,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT),
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
    max: 20,                  // Maximum number of clients in the pool
    idleTimeoutMillis: 30000  // Closes idle clients after 30 seconds
};

const { Pool } = pg;

const pool = new Pool(config);

export default async function storeEmbeddingInDB(text: string, embedding: number[]): Promise<void> {
   
    let query = `INSERT INTO document_embeddings (content, embedding) VALUES ($1, $2) RETURNING id`;

    let vectorString = "[" + embedding.join(",") + "]";

    pool.query(query, [text, vectorString])

}
