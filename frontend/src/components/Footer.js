import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p> All Rights Reserved</p>
      <div className="footer-links">
        <a href="https://www.linkedin.com" target="_blank" rel="">
          LinkedIn
        </a>
        <a href="https://twitter.com" target="_blank" rel="">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;