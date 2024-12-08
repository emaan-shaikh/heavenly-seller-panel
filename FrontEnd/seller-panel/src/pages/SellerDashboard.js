import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import DashboardText from "../components/DashboardText";
import CardStack from "../components/CardStack";
import PromotionBanner from "../components/PromotionBanner";
import YourListings from "../components/YourListings"; 
import { useUser } from "../contexts/UserContext";

import "../styles/SellerDashboard.css";

const SellerDashboard = () => {
  const { user } = useUser();
  console.log("Logged-in user:", user); // Debug user data


  return (
    
    <div className="seller-dashboard">
      <Navbar />
      <Banner />
      <DashboardText />
      <CardStack />
      {user && <YourListings userEmail={user.email} />} {/* Pass user's email */}
      <PromotionBanner />
      <Footer />
    </div>
  );
};

export default SellerDashboard;
