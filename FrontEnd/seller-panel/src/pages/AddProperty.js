import React, { useState } from "react";
import "../styles/AddProperty.css";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyTitle: "",
    propertyType: "",
    description: "",
    price: "",
    area: "",
    beds: "",
    baths: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    imageUrls: [],
    features: {
      iron: false,
      dishwasher: false,
      pool: false,
      lawn: false,
      parking: false,
    },
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("features.")) {
      const feature = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [feature]: checked,
        },
      }));
    } else if (name === "imageUrls") {
      setFormData((prev) => ({
        ...prev,
        imageUrls: value.split(",").map((url) => url.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Property Data:", formData);
    alert("Property submitted successfully!");
  };

  return (
    <div className="add-property">
      <h1 className="form-title">Add Your Property Listing</h1>
      <form onSubmit={handleSubmit}>
        {/* Property Information */}
        <fieldset>
          <legend>Property Information</legend>
          <div className="form-group">
            <label htmlFor="propertyTitle">Property Title *</label>
            <input
              type="text"
              id="propertyTitle"
              name="propertyTitle"
              value={formData.propertyTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="propertyType">Property Type *</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Land">Land</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">Area (sq ft) *</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="beds">Bedrooms</label>
            <input
              type="number"
              id="beds"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="baths">Bathrooms</label>
            <input
              type="number"
              id="baths"
              name="baths"
              value={formData.baths}
              onChange={handleChange}
              min="0"
            />
          </div>
        </fieldset>

        {/* Location */}
        <fieldset>
          <legend>Location</legend>
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code *</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        {/* Features */}
        <fieldset>
          <legend>Features</legend>
          {Object.keys(formData.features).map((feature) => (
            <div className="form-group checkbox-group" key={feature}>
              <label>
                <input
                  type="checkbox"
                  name={`features.${feature}`}
                  checked={formData.features[feature]}
                  onChange={handleChange}
                />
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Images */}
        <fieldset>
          <legend>Images</legend>
          <div className="form-group">
            <label htmlFor="imageUrls">Image URLs (comma-separated)</label>
            <input
              type="text"
              id="imageUrls"
              name="imageUrls"
              value={formData.imageUrls.join(", ")}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Contact Information */}
        <fieldset>
          <legend>Contact Information</legend>
          <div className="form-group">
            <label htmlFor="contactName">Name *</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactEmail">Email *</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPhone">Phone *</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        <button type="submit" className="submit-button">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
