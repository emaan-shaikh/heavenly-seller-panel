import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import DashboardText from "../components/DashboardText";
import CardStack from "../components/CardStack";
import PromotionBanner from "../components/PromotionBanner";


import "../styles/SellerDashboard.css";

const SellerDashboard = () => {
  return (
    <div className="seller-dashboard">
      <Navbar />
      <Banner />
      <DashboardText />
      <CardStack />
      <PromotionBanner />
      <Footer />
    </div>
  );
};

export default SellerDashboard;
