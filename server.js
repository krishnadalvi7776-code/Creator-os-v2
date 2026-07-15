import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Creator OS Backend is Running 🚀");
});
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
app.get("/models", async (req, res) => {
  try {
    const models = await ai.models.list();
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
app.post("/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateVideos({
      model: "veo-3.1-generate-preview",
      prompt,
    });

    res.json(response);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
