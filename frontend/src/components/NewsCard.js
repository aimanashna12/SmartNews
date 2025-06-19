import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsCard.css";

const NewsCard = ({ article }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((fav) => fav.url === article.url));
  }, [article]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.url !== article.url);
    } else {
      favorites.push(article);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const shareArticle = (platform) => {
    const url = encodeURIComponent(article.url);
    const text = encodeURIComponent(article.title);

    let shareURL = "";
    switch (platform) {
      case "whatsapp":
        shareURL = `https://wa.me/?text=${text} - ${url}`;
        break;
      case "linkedin":
        shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "native":
        if (navigator.share) {
          navigator
            .share({
              title: article.title,
              text: article.description,
              url: article.url,
            })
            .catch((error) => console.log("Error sharing:", error));
          return;
        } else {
          alert("Sharing not supported on this browser");
          return;
        }
      default:
        return;
    }
    window.open(shareURL, "_blank");
  };

  const fetchSummary = async () => {
    setIsSummarizing(true);
    try {
      const response = await axios.post("http://localhost:5000/summarize", {
        content: `${article.title}. ${article.description?.slice(0, 400) || ""}`,
      });
      setSummary(response.data.summary);
    } catch (err) {
      console.error("Error fetching summary:", err);
      setSummary("Failed to summarize.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="news-card">
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>

      <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? " Remove from Favourites" : " Save to Favourites"}
      </button>
      <div className="box">
        <div className="share-container">
          <button
            className="share-btn"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            Share
          </button>
          {showShareOptions && (
            <div className="share-options">
              <button className="platform" onClick={() => shareArticle("whatsapp")}>
                WhatsApp
              </button>
              <button className="platform" onClick={() => shareArticle("linkedin")}>
                LinkedIn
              </button>
              <button className="platform" onClick={() => shareArticle("facebook")}>
                Facebook
              </button>
            </div>
          )}
        </div>

        <div className="share-container">
          <button className="share-btn" onClick={fetchSummary} disabled={isSummarizing}>
            {isSummarizing ? "Summarizing..." : "Show Summary"}
          </button>
          {summary && (
            <p className="summary-text">
              <strong>Summary:</strong> {summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
