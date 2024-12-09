import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Reuse existing Navbar
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import { UserProvider } from './contexts/UserContext'; 

import SellerDashboard from "./pages/SellerDashboard"; 
import AddProperty from "./pages/AddProperty";
import Auth from './pages/Auth'
import PropertySuccess from "./pages/PropertySuccess";
import PropertyDetail from "./pages/PropertyDetail";
import Notifications from "./pages/Notifications";
import NextSteps from "./pages/NextSteps";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";


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
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/property-success" element={<PropertySuccess />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/property-detail/:id" element={<PropertyDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/next-steps" element={<NextSteps />} />
            <Route path="/payment" element={<PaymentPage />} /> {/* Placeholder */}
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/" element={<Navigate to="/sauth" />} />
            </Routes>
        )}
      </div>
    </Router>
    </UserProvider>
    </GoogleOAuthProvider> // Closing the GoogleOAuthProvider
  );
};

export default App;
