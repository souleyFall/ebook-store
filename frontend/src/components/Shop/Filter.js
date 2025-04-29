import React from 'react';

const Filter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="filter-select">Trier par:</label>
      <select 
        id="filter-select"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="default">Plus récents</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="rating-desc">Mieux notés</option>
      </select>
    </div>
  );
};

export default Filter;