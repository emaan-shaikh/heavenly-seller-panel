import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import "../styles/PropertyDetail.css";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [property, setProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const dummyReviews = [
    { id: 1, reviewer: "Alice Johnson", rating: 5, comment: "Fantastic property!" },
    { id: 2, reviewer: "Mark Smith", rating: 4, comment: "Great location, spacious rooms." },
    { id: 3, reviewer: "Sarah Brown", rating: 3, comment: "Good property but needs some maintenance." },
  ];

  useEffect(() => {
    if (!user?.email) {
      setError("User email is required to fetch the property details.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/properties/${id}`, {
        params: { email: user.email },
      })
      .then((response) => {
        setProperty(response.data);
        setEditedProperty(response.data); // Pre-fill form with existing data
      })
      .catch((err) => {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details.");
      })
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
  
    setEditedProperty((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value, // Convert number fields
    }));
  };
  
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
  
    const { __v, imageUrls, ...propertyData } = editedProperty; // Exclude unnecessary fields
  
    axios
      .put(`http://localhost:5000/api/properties/${id}`, propertyData, {
        params: { email: user.email },
      })
      .then((response) => {
        setProperty(response.data); // Update property data
        setIsEditing(false);
        // alert("Property details updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating property details:", err);
        alert("Failed to update property details.");
      });
  };
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      axios
        .delete(`http://localhost:5000/api/properties/${id}`, {
          params: { email: user.email },
        })
        .then(() => {
          alert("Property deleted successfully.");
          window.location.href = "/seller-dashboard"; // Redirect after deletion
        })
        .catch((err) => {
          console.error("Error deleting property:", err);
          alert("Failed to delete property.");
        });
    }
  };
  

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="property-detail-container">
      {/* Image Section */}
      <div className="property-gallery">
        <div className="main-image-container">
          <img
            src={property.imageUrls[0]}
            alt="Main Property"
            className="main-image"
          />
        </div>
        <div className="thumbnail-gallery">
          {property.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail-image"
            />
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="property-content-grid">
        {/* Left Section */}
        <div className="property-left">
          {/* Details Section */}
          {isEditing ? (
            <form className="edit-property-form" onSubmit={handleEditSubmit}>
              <h2>Edit Property</h2>
              <label>
                Title:
                <input
                  type="text"
                  name="propertyTitle"
                  value={editedProperty.propertyTitle}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="propertyDescription"
                  value={editedProperty.propertyDescription}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </label>
              <label>
                Price (Rs):
                <input
                  type="number"
                  name="price"
                  value={editedProperty.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Bedrooms:
                <input
                  type="number"
                  name="bedrooms"
                  value={editedProperty.bedrooms}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Bathrooms:
                <input
                  type="number"
                  name="bathrooms"
                  value={editedProperty.bathrooms}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Size (m²):
                <input
                  type="number"
                  name="size"
                  value={editedProperty.size}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="property-details">
              <h1 className="property-title">{property.propertyTitle}</h1>
              <p className="property-location">
                {property.city}, {property.country}
              </p>
              <p className="property-price">Rs. {property.price.toLocaleString()}</p>
              <div className="property-key-details">
                <div className="detail-item">
                  <FaBed className="detail-icon" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="detail-item">
                  <FaBath className="detail-icon" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="detail-item">
                  <FaRulerCombined className="detail-icon" />
                  <span>{property.size} m²</span>
                </div>
              </div>
              <button
                className="edit-button"
                onClick={handleEditToggle}
              >
                Edit Property
              </button>
              <button
                className="delete-button"
                onClick={handleDelete}
              >
                Delete Listing
              </button>
            </div>
          )}

          {/* Description Section */}
          <div className="property-description">
            <h2>Description</h2>
            <p>{property.propertyDescription}</p>
          </div>

          {/* Amenities Section */}
          <div className="property-amenities">
            <h2>Amenities</h2>
            <ul className="amenities-list">
              {Object.entries(property.amenities)
                .filter(([_, value]) => value)
                .map(([amenity], index) => (
                  <li key={index} className="amenity-item">
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Right Section - Reviews */}
        <div className="property-reviews">
          <h2>Reviews</h2>
          <div className="reviews-container">
            {dummyReviews.map((review) => (
              <div key={review.id} className="review-card">
                <p className="reviewer-name">{review.reviewer}</p>
                <p className="review-rating">Rating: {review.rating} ⭐</p>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
