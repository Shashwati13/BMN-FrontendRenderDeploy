import React from 'react';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <label>Price:</label>
      <select>
        <option value="any">Any</option>
        <option value="100">$100 or less</option>
        <option value="500">$500 or less</option>
        <option value="1000">$1000 or less</option>
      </select>
      <label>Location:</label>
      <select>
        <option value="any">Any</option>
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
      </select>
      <label>Type:</label>
      <select>
        <option value="any">Any</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Townhouse">Townhouse</option>
      </select>
    </div>
  );
};

export default FilterBar;
