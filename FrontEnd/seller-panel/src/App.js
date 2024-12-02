import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SellerDashboard from "./pages/SellerDashboard"; // Updated import for your SellerDashboard
import Navbar from "./components/Navbar"; // Reuse existing Navbar
import "./App.css";

const App = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [moveToTopLeft, setMoveToTopLeft] = useState(false);

  // Video transition logic
  const handleVideoEnd = () => {
    setTimeout(() => {
      setMoveToTopLeft(true); // Move video to top-left after it ends
      setTimeout(() => {
        setShowNavbar(true); // Show Navbar after video ends
      }, 500);
    }, 500); // Delay for video transition
  };

  return (
    <Router>
      <div className="App">
        {/* Video Animation (Logo) */}
        <video
          src="/assets/Logo.mp4" // Path to the logo video
          autoPlay
          muted
          onEnded={handleVideoEnd}
          className={`logo-video ${moveToTopLeft ? "to-top-left" : ""}`} // Conditional animation classes
        />

        {/* Navbar will only appear after video has finished */}
        {showNavbar && <Navbar />}
        <br />
        <br />
        <br />
        <br />

        {/* Routes */}
        {showNavbar && (
          <Routes>
            <Route path="/" element={<SellerDashboard />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
