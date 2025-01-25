import React from 'react';
import '../css/search.css';

const SearchBar = ({ searchTerm, handleSearch, categoryFilter, handleCategoryChange, handleSearchButtonClick }) => {
  return (
    <div className="search-bar-container">
      <select value={categoryFilter} onChange={handleCategoryChange}>
        <option value="">All Meal Types</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <input
        type="text"
        placeholder="Search by recipe name"
        onChange={handleSearch}
        value={searchTerm}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
    </div>
  );
};

export default SearchBar;
