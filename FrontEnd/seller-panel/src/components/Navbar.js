import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaComment, FaBell, FaGlobe } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState();


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
            <a href="/seller-dashboard" className="nav-link">Sell</a>
          </div>
        </div>

        {/* Right section (Notifications, language, profile) */}
        <div className="navbar-right">
        <a href="#" className="chat nav-link">
            <FaComment className="icon" /> Chat
          </a>

          <a href="/notifications" className="notifications nav-link">
            <FaBell className="icon" />
          </a>
          
          <div className="profile-pic" onClick={handleProfileClick}>
            {user && user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="profile-image" />
            ) : (
              <img src="/assets/Profile.jpg" alt="User" className="profile-image" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
