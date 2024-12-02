import React, { useState, useRef, useEffect } from "react";
import "../styles/SearchBar.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchBar = () => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const locationDropdownRef = useRef(null);
  const locationInputRef = useRef(null);

  // Toggle location dropdown
  const toggleLocationDropdown = () => {
    setShowLocationDropdown(!showLocationDropdown);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar">
      <div className="search-box-container">
        {/* Location Input */}
        <div className="search-box location-box">
          <div className="search-heading">Where</div>
          <input
            type="text"
            placeholder="Enter Address, City or Zip"
            className="search-input location-input"
            value={selectedLocation}
            onClick={toggleLocationDropdown}
            ref={locationInputRef}
          />

          {/* Location Dropdown */}
          {showLocationDropdown && (
            <div className="location-dropdown" ref={locationDropdownRef}>
              <div
                className="location-dropdown-item"
                onClick={() => handleLocationSelect("New York, NY")}
              >
                <span className="location-icon">
                  <FaMapMarkerAlt />
                </span>{" "}
                New York, NY
              </div>
              <hr />
              <div
                className="location-dropdown-item"
                onClick={() => handleLocationSelect("Los Angeles, CA")}
              >
                <span className="location-icon">
                  <FaMapMarkerAlt />
                </span>{" "}
                Los Angeles, CA
              </div>
              <hr />
              <div
                className="location-dropdown-item"
                onClick={() => handleLocationSelect("Chicago, IL")}
              >
                <span className="location-icon">
                  <FaMapMarkerAlt />
                </span>{" "}
                Chicago, IL
              </div>
              <hr />
              <div
                className="location-dropdown-item"
                onClick={() => handleLocationSelect("Miami, FL")}
              >
                <span className="location-icon">
                  <FaMapMarkerAlt />
                </span>{" "}
                Miami, FL
              </div>
              <hr />
              <div
                className="location-dropdown-item"
                onClick={() => handleLocationSelect("Dallas, TX")}
              >
                <span className="location-icon">
                  <FaMapMarkerAlt />
                </span>{" "}
                Dallas, TX
              </div>
            </div>
          )}
        </div>
      </div>
      <button className="search-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="search-icon"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
