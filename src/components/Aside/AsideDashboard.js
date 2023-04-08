import React, { useState } from "react";
import "./AsideDashboard.css";

import data from "../screens/DashboardScreen/Data.json";

const Aside = ({ onpage }) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState(null);
  const [rent, setRent] = useState(null);
  const [type, setType] = useState(null);

  const handleToggle = () => {
    setIsListOpen(!isListOpen);
  };
  const handleSubmit = () => {
    // Filter data based on selected filters
    const filteredData = data.filter((apartment) => {
      if (bedrooms && apartment.bedrooms < parseInt(bedrooms)) {
        return false;
      }
      if (rent && apartment.rent > parseInt(rent)) {
        return false;
      }
      if (type && apartment.type !== type) {
        return false;
      }
      return true;
    });

    // Display relevant details of filtered apartments
    console.log("Filtered apartments: ", filteredData);
  };

  const handleBedroomsChange = (e) => {
    setBedrooms(e.target.value);
  };

  const handleRentChange = (e) => {
    setRent(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleReset = () => {
    setBedrooms(null);
    setRent(null);
    setType(null);
    document.getElementById("bedrooms").value = "";
    document.getElementById("rent").value = "";
    document.getElementById("type").value = "";
  };

  return onpage === "dashboard" ? (
    <aside>
      <div className="filters">
        <div className={`filter ${isListOpen ? "open" : ""}`}>
          <button className="button" onClick={handleToggle}>
            Filters
          </button>
          <div className="options">
            <div className="option">
              <label htmlFor="bedrooms">Bedrooms:</label>
              <select
                id="bedrooms"
                value={bedrooms}
                onChange={handleBedroomsChange}
              >
                <option value="">No min</option>
                <option value="1">1 bed</option>
                <option value="2">2 bed</option>
                <option value="3">3 bed</option>
                <option value="4">4 bed</option>
              </select>
            </div>
            <div className="option">
              <label htmlFor="rent">Rent per month:</label>
              <select id="rent" value={rent} onChange={handleRentChange}>
                <option value="">No min</option>
                <option value="800">$800</option>
                <option value="900">$900</option>
                <option value="1100">$1100</option>
                <option value="1300">$1300</option>
                <option value="1500">$1500</option>
                <option value="1700">$1700</option>
                <option value="greater">$1700+</option>
              </select>
            </div>
            <div className="option">
              <label htmlFor="type">Type:</label>
              <select id="type" value={type} onChange={handleTypeChange}>
                <option value="">All</option>
                <option value="Apartments">Apartments </option>
                <option value="Houses">Houses</option>
                <option value="Condos">Condos</option>
                <option value="Townhomes">Townhomes</option>
              </select>
            </div>

            <div className="actions">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  ) : onpage === "Owner" ? (
    <aside>{/* implement code for "Owner" page */}</aside>
  ) : null;
};

export default Aside;
