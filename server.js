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

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are Sunny Kumar from IIT ISM. Answer personally in 5-6 sentences." },
      { role: "user", content: question }
    ]
  });

  res.json({ answer: response.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running"));
