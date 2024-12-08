import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/AddProperty.css";
import axios from "axios"; // Install axios if not already installed: npm install axios


const AddProperty = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    propertyTitle: "",
    propertyDescription: "",
    propertyCategory: "",
    listedIn: "",
    price: "",
    taxRate: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    kitchens: "",
    garages: "",
    garageSize: "",
    yearBuilt: "",
    floors: "",
    additionalInfo: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    amenities: {
      ac: false,
      heating: false,
      pool: false,
      garden: false,
      lawn: false,
      elevator: false,
      fireplace: false,
      parking: false,
    },
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name.startsWith("amenities.")) {
      // Handle amenities separately
      const amenityName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        amenities: {
          ...prevData.amenities,
          [amenityName]: checked,
        },
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...Array.from(files)],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare form data for submission
  const submissionData = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "images") {
      // Append each image file to the form data
      value.forEach((file) => submissionData.append("images", file));
    } else if (key === "amenities") {
      // Send amenities as JSON string
      submissionData.append(key, JSON.stringify(value));
    } else {
      submissionData.append(key, value);
    }
  });

  try {
    // Make the API call
    const response = await axios.post("http://localhost:5000/api/properties", submissionData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      navigate("/property-success");
    } else {
      alert("Failed to add property");
    }
  } catch (error) {
    console.error("Error adding property:", error.response?.data || error.message);
    alert("An error occurred while adding the property");
  }
};


  return (
    <div className="add-property">
      <h1 className="form-title">List Your Property</h1>
      <form onSubmit={handleSubmit}>
        {/* Overview Section */}
        <fieldset>
          <legend>Overview</legend>
          <div className="overview-section">
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
              <label htmlFor="propertyDescription">Description *</label>
              <textarea
                id="propertyDescription"
                name="propertyDescription"
                value={formData.propertyDescription}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="propertyCategory">Category *</label>
                <select
                  id="propertyCategory"
                  name="propertyCategory"
                  value={formData.propertyCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="listedIn">Listed In *</label>
                <select
                  id="listedIn"
                  name="listedIn"
                  value={formData.listedIn}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Option</option>
                  <option value="Sell">Sell</option>
                  <option value="Rent">Rent</option>
                </select>
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
                <label htmlFor="taxRate">Yearly Tax Rate *</label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </fieldset>

        {/* Listing Details */}
        <fieldset>
          <legend>Listing Details</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="size">Size (sq ft) *</label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms *</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms *</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="kitchens">Kitchens *</label>
              <input
                type="number"
                id="kitchens"
                name="kitchens"
                value={formData.kitchens}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="garages">Garages *</label>
              <input
                type="number"
                id="garages"
                name="garages"
                value={formData.garages}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="garageSize">Garage Size</label>
              <input
                type="text"
                id="garageSize"
                name="garageSize"
                value={formData.garageSize}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearBuilt">Year Built</label>
              <input
                type="text"
                id="yearBuilt"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="floors">Floors</label>
              <input
                type="number"
                id="floors"
                name="floors"
                value={formData.floors}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Info</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            ></textarea>
          </div>
        </fieldset>

        {/* Amenities */}
        <fieldset>
          <legend>Amenities</legend>
          <div className="amenities-grid">
            {Object.keys(formData.amenities).map((amenity) => (
              <div className="amenities-item" key={amenity}>
                <input
                  type="checkbox"
                  id={amenity}
                  name={`amenities.${amenity}`}
                  checked={formData.amenities[amenity]}
                  onChange={handleChange}
                />
                <label htmlFor={amenity}>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Address & Location */}
        <fieldset>
          <legend>Address & Location</legend>
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
          <div className="address-grid">
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
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
          </div>
        </fieldset>

        {/* Photo/Video Upload */}
        <fieldset>
          <legend>Photo Attachment</legend>
          <div className="photo-upload">
            <label htmlFor="images">Upload Images *</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleChange}
              multiple
            />
            <div className="image-previews">
              {formData.images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
