import React, { useState, useEffect, useRef } from "react";
import "../styles/DashboardText.css";

const DashboardText = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null); // Reference for the section

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Add the visible class when in view
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`dashboard-text ${isVisible ? "visible" : ""}`}
    >
      <div className="text-left">
        <h2>Sell to Heavenly.</h2>
        <p className="highlight">Skip the hard parts.</p>
      </div>
      <div className="text-right">
        <p>
          We cut out the unnecessary steps to make selling your home easy,
          fast, and stress-free.
        </p>
      </div>
    </div>
  );
};

export default DashboardText;
