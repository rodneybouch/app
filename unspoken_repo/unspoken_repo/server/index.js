import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const AUTH = process.env.PROXY_TOKEN;

app.post("/coach", async (req, res) => {
  try {
    if (AUTH && req.headers.authorization !== `Bearer ${AUTH}`) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const { messages } = req.body;
    const chat = await openai.chat.completions.create({
      model: "gpt-5.1-mini",
      messages,
      temperature: 0.6,
      max_tokens: 300
    });
    const reply = chat.choices?.[0]?.message?.content || "";
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ error: "coach-failed", details: String(e) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Unspoken proxy on :${port}`));
