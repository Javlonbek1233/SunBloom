import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // AI Garden Designer Endpoint
  app.post("/api/design", async (req, res) => {
    const { prompt, currentPlants } = req.body;
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a cinematic garden designer for an app called SunBloom.
        The user has a square garden (20x20 units).
        Provide a list of 5-10 plant placements in JSON format.
        Each plant should have: type (one of: 'Rose', 'Tulip', 'Sunflower', 'Lavender', 'Lily'), x (-8 to 8), z (-8 to 8), and scale (0.5 to 1.5).
        Current garden status: ${JSON.stringify(currentPlants)}
        User prompt: ${prompt}
        Respond ONLY with the JSON array.`,
        config: {
          responseMimeType: "application/json",
        }
      });

      const design = JSON.parse(result.text || "[]");
      res.json(design);
    } catch (error) {
      console.error("AI Designer Error:", error);
      res.status(500).json({ error: "Failed to generate design" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
