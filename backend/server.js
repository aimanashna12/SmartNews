require("dotenv").config(); 
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// NEWS ROUTE (unchanged)
app.get("/news", async (req, res) => {
  const category = req.query.category || "general";
  const apiKey = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

// ✅ HUGGING FACE SUMMARIZE ROUTE
app.post("/summarize", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "No content provided" });
  }

  try {
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: content },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,  // Uses your .env key
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    if (hfResponse.data.error) {
      throw new Error(hfResponse.data.error);
    }

    const summary = hfResponse.data[0]?.summary_text || "No summary available.";
    res.json({ summary });

  } catch (error) {
    console.error("HF Error:", error.message);
    res.status(500).json({ error: "Summarization failed" });
  }
});

// Start server
app.listen(5000, () => console.log("Backend running on port 5000"));
