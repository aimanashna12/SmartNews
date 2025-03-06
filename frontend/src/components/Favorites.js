import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <h1>Favorite Articles</h1>
      <div className="news-container">
        {favorites.length > 0 ? (
          favorites.map((article, index) => <NewsCard key={index} article={article} />)
        ) : (
          <p>No favorite articles saved.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
