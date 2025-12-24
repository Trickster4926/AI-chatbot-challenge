const express = require("express");
const axios = require("axios");
const Message = require("../models/Message");

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
    // console["log"](message);
  try {
    // Save user message
    await Message.create({ role: "user", content: message });

    // Call Ollama
    const ollamaRes = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: message,
        stream: false
      }
    );

    const reply = ollamaRes.data.response;

    // Save AI response
    await Message.create({ role: "ai", content: reply });

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ollama error" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to load history" });
  }
})

module.exports = router;
