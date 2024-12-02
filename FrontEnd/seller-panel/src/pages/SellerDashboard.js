import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import DashboardText from "../components/DashboardText";
import CardSection from "../components/CardStack";

import "../styles/SellerDashboard.css";
import CardStack from "../components/CardStack";

const SellerDashboard = () => {
  return (
    <div className="seller-dashboard">
      <Navbar />
      <Banner />
      <DashboardText />
      <CardStack />

      <Footer />
    </div>
  );
};

export default SellerDashboard;
