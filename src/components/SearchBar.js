import React from 'react';
import '../css/search.css'; // Import custom CSS

const SearchBar = ({ searchTerm, handleSearch, categoryFilter, handleCategoryChange, handleSearchButtonClick }) => {
  return (
    <div className="search-bar-container">
      {/* Dropdown for selecting meal type */}
      <select value={categoryFilter} onChange={handleCategoryChange}>
        <option value="">All Meal Types</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      
      {/* Input field for searching recipe by name */}
      <input
        type="text"
        placeholder="Search by recipe name"
        onChange={handleSearch}
        value={searchTerm}
      />
      
      {/* Search button */}
      <button onClick={handleSearchButtonClick}>Search</button>
    </div>
  );
};

export default SearchBar;
