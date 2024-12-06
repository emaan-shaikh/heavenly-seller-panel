import React, { useEffect, useState, useRef } from "react";
import "../styles/PromotionBanner.css";
import { useNavigate } from "react-router-dom";

const PromotionBanner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const bannerRef = useRef(null); // Ref for the banner wrapper

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Mark as visible when in viewport
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  const handleButtonClick = () => {
    navigate("/add-property"); // Replace with your selling process page route
  };

  return (
    <div
      ref={bannerRef}
      className={`promotion-banner-wrapper ${isVisible ? "visible" : ""}`}
    >
      <div className="promotion-banner">
        <div className="promotion-content">
          <h2 className="promotion-title">Sell With Heavenly Today</h2>
          <p className="promotion-description">
            Let us make the process of selling your home stress-free and efficient. With our expert team and streamlined process, you’re just a step away from achieving your real estate goals.
          </p>
          <ul className="promotion-list">
            <li>
              <span className="checkmark">{'\u2713'}</span> Transparent pricing and lower fees
            </li>
            <li>
              <span className="checkmark">{'\u2713'}</span> Tailored marketing strategies for your property
            </li>
            <li>
              <span className="checkmark">{'\u2713'}</span> Expert guidance from start to finish
            </li>
          </ul>
          <button className="promotion-button" onClick={handleButtonClick}>
            Start Selling
          </button>
        </div>
        <div className="promotion-image">
          <img
            src="/assets/promotionbanner.png" // Replace with actual image path
            alt="Sell With Heavenly"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
