import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SellerDashboard from "./pages/SellerDashboard"; 
import Navbar from "./components/Navbar"; // Reuse existing Navbar
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import { UserProvider } from './contexts/UserContext'; 
import AddProperty from "./pages/AddProperty";
import Auth from './pages/Auth'
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
    <GoogleOAuthProvider clientId="342114927823-scqsgi1l7shteihubi30npk1hg2vsvj4.apps.googleusercontent.com">
    <UserProvider>
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
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/auth" element={<Auth />} />

          </Routes>
        )}
      </div>
    </Router>
    </UserProvider>
    </GoogleOAuthProvider> // Closing the GoogleOAuthProvider
  );
};

export default App;
