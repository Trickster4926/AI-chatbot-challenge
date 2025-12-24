require("dotenv").config();
const express = require("express");
const axios = require("axios");
const Message = require("../models/Message");

const router = express.Router();

router.post("/", async (req, res) => {
  const BASE_OLLAMA_URL = process.env.OLLAMA_URL;
  const OLLAMA_MODEL = process.env.OLLAMA_MODEL;

  const { message } = req.body;
    // console["log"](message);
  try {
    // Save user message
    await Message.create({ role: "user", content: message });
    const requestURL = BASE_OLLAMA_URL + "/api/generate";
    // Call Ollama
    const ollamaRes = await axios.post(
      requestURL ,
      {
        model: OLLAMA_MODEL,
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

router.delete("/clear" , async (req,res) =>{
   try {
    await Message.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    console.error("Clear history error:", err.message);
    res.status(500).json({ error: "Failed to clear chat history" });
  }
})

module.exports = router;
