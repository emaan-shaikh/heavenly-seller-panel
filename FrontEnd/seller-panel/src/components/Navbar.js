import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaGlobe } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend API
    axios.get("http://localhost:5000/api/users/profile")  // Replace with your backend URL
      .then(response => {
        setUser(response.data);  // Store user data in state
      })
      .catch(error => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const handleProfileClick = () => {
    // Handle the navigation to the profile page
    window.location.href = "/profile";  // You can use react-router for a single-page application
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        {/* Left section (empty) */}
        <div className="navbar-left"></div>

        {/* Middle section (nav links) */}
        <div className="navbar-center">
          <div className="nav-links">
            <a href="#" className="nav-link">Buy</a>
            <a href="#" className="nav-link">Rent</a>
            <a href="#" className="nav-link">Sell</a>
          </div>
        </div>

        {/* Right section (favorites, language, profile) */}
        <div className="navbar-right">
          <a href="#" className="favorites nav-link">
            <FaHeart className="icon" /> Favorite
          </a>
          <a href="#" className="language nav-link">
            <FaGlobe className="icon" /> EN
          </a>
          <div className="profile-pic" onClick={handleProfileClick}>
            {user && user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-placeholder">User</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
