import "dotenv/config";

export default async function createEmbedding(
    text: string
): Promise<number[]> {

    const apiKey: string | undefined = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured.");
    }

    if (!text || text.trim().length === 0) {
        throw new Error("Text is required.");
    }

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey
            },
            body: JSON.stringify({
                content: {
                    parts: [
                        {
                            text: text
                        }
                    ]
                }
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `Gemini API error (${response.status}): ${errorText}`
        );
    }

    const data = await response.json();

    return data.embedding.values;
}