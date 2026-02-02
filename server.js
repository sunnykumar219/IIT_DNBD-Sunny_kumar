import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
I am Sunny Kumar, a final-year Electrical Engineering student at IIT (ISM) Dhanbad.

`;

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: question },
    ],
  });

  const answer = chat.choices[0].message.content;

  const speech = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: answer,
  });

  const audio = Buffer.from(await speech.arrayBuffer()).toString("base64");

  res.json({ answer, audio });
});

app.listen(3000, () => console.log("Server started"));