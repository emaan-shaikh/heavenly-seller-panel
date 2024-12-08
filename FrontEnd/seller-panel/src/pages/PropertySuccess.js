import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PropertySuccess.css";

const PropertySuccess = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/seller-dashboard"); // Replace with the correct route for your seller dashboard
  };

  return (
    <div className="success-container">
      <h1>Property Added Successfully!</h1>
      <p>Your property listing has been added. You can now manage your listings on your dashboard.</p>
      <button className="dashboard-button" onClick={goToDashboard}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default PropertySuccess;
