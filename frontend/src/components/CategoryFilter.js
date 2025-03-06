import React from "react";
import "./CategoryFilter.css";

const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

const CategoryFilter = ({ setCategory }) => {
  return (
    <div className="category-filter">
      <div className="choose">Choose the category you wish to explore! </div>
      <select onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
