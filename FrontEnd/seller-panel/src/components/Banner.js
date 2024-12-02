import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar"; // Use your existing SearchBar component
import "../styles/Banner.css"; // Ensure this includes particles.js styling
import "../scripts/particles.js"; // Keeps your particles.js functionality

const Banner = () => {
  const [showBanner, setShowBanner] = useState(false); // Controls banner visibility
  const [showSearchBar, setShowSearchBar] = useState(false); // Controls search bar visibility

  useEffect(() => {
    // Initialize particles.js
    if (window.particlesJS) {
      window.particlesJS.load("particles-js", "/particles.json", () => {
        console.log("Particles.js configuration loaded.");
      });
    }

    // Smooth animation for the banner and search bar
    const bannerTimer = setTimeout(() => {
      setShowBanner(true); // Show banner
      setTimeout(() => {
        setShowSearchBar(true); // Show search bar after banner animation
      }, 500); // Delay for search bar animation
    }, 300); // Delay for banner animation

    return () => clearTimeout(bannerTimer); // Cleanup timers
  }, []);

  return (
    <div className={`banner ${showBanner ? "visible" : ""}`}>
      {/* Particles.js Background */}
      <div id="particles-js"></div>

      {/* Banner Heading */}
      <div className="banner-text">
        <h1>
          Enjoy <span className="highlight">Just 1% Listing</span> 
          <br />
          Fee on Your Sells
        </h1>
      </div>

      {/* SearchBar */}
      <div className={`search-bar-container ${showSearchBar ? "visible" : ""}`}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Banner;
