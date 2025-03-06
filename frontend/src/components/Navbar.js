import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png"
import "./Navbar.css";
// import Favorites from "./components/Favorites";

const Navbar = ({ darkMode }) => {
  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="navbar-left">
        <img
          src={logo}
          alt="SmartNews Logo"
          className="logo"
        />
        <span className="brand-name">SmartNews</span>
      </div>
      <ul className="navbar-links">
        <div className="tabs"><Link to="/">Home</Link></div>
        <div className="tabs"><Link to="/favorites">Favourites</Link></div>
      </ul>
      {/* <div className="navbar-right">
        <button className="search-btn">🔍</button>
        <Link to="/login" className="login">Log in</Link>
        <button className="signup-btn">Sign up</button>
      </div> */}
    </nav>
  );
};

export default Navbar;


