import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NewsCard from "./components/NewsCard";
import CategoryFilter from "./components/CategoryFilter";
import Favorites from "./components/Favorites";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"


const App = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/news?category=${category}&page=${page}`)
      .then((response) => {
        setNews(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, [category, page]);
  
  return (
    <Router>
      <div className={`app ${darkMode ? "dark-mode" : ""}`}>
        <header>
        </header>
        <Navbar darkMode={darkMode}/>
        <button className="mode" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <section className="intro">
          <div className="Intro-big">Stay ahead of the curve</div>
          <div className="Intro-small marquee">
            <span>SmartNews is the fastest way to track the topics and trends that matter to you.</span>
          </div>
        </section>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoryFilter setCategory={setCategory} />
                {loading ? (
                  <p>Loading news...</p>
                ) : (
                  <div className="news-container">
                    {news.map((article, index) => (
                      <NewsCard key={index} article={article} />
                    ))}
                  </div>
                )}
                <div className="pagination">
                  <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                  </button>
                  <span className="page">Page {page}</span>
                  <button onClick={() => setPage(page + 1)}>&gt;</button>
                </div>
              </>
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer/> 
      </div>
    </Router>
  );
};

export default App;


