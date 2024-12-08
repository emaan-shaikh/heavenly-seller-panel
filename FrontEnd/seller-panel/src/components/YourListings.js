import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import FaMapMarkerAlt
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/YourListings.css";

const YourListings = ({ userEmail }) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  const navigate = useNavigate(); // Initialize navigate
  const listingsPerPage = 6; // Define the number of listings per page

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get(`http://localhost:5000/api/properties?email=${userEmail}`)
      .then((response) => setProperties(response.data))
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setError("Failed to load your listings.");
      });
  }, [userEmail]);

  // Visibility observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector(".your-listings-container");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(properties.length / listingsPerPage);
  const displayedProperties = properties.slice(
    (currentPage - 1) * listingsPerPage,
    currentPage * listingsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Navigate to PropertyDetail with the property ID
  const handlePropertyClick = (propertyId) => {
    navigate(`/property-detail/${propertyId}`);
  };

  return (
    <div
      className={`your-listings-container ${isVisible ? "visible" : ""}`}
    >
      <div className="your-listings-heading">
        <h2 className="your-listings-title">Your Listings</h2>
      </div>

      <div className="listing-grid-container">
        <div className="listing-grid">
          {displayedProperties.map((property) => (
            <div
              key={property._id}
              className="listing-item"
              onClick={() => handlePropertyClick(property._id)} // Add onClick handler
              style={{ cursor: "pointer" }} // Make it clear that this is clickable
            >
              <img
                src={property.imageUrls[0]}
                alt={property.propertyTitle}
                className="listing-img"
              />
              <div className="listing-overlay">
                <p className="listing-location">
                  <FaMapMarkerAlt /> {property.city}
                </p>
                <p className="listing-price">Rs. {property.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default YourListings;
