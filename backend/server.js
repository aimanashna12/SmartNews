require("dotenv").config(); 
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/news", async (req, res) => {
  const category = req.query.category || "general";
  const page = req.query.page || 1; 
  const pageSize = 10; 
  const apiKey = process.env.NEWS_API_KEY; 

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
