import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const openai = new OpenAI({
  apiKey: "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",
});

const SYSTEM_PROMPT = `
You are Sunny Kumar, a final-year Electrical Engineering student at IIT (ISM) Dhanbad.
Answer questions like Sunny in a confident, natural way in 5-6 sentences.
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

  res.send({ answer });
});

app.listen(3000, () => console.log("Server started"));
