import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Top Section: Bubble Searches */}
      <div className="footer-bubbles">
        <span className="bubble selected">Popular Search</span>
        <span className="bubble">Real estate markets</span>
        <span className="bubble">Top-Picked Properties</span>
        <span className="bubble">Find city rental homes</span>
      </div>

      {/* Horizontal Line */}
      <hr className="footer-divider" />

      {/* Middle Section: Categories */}
      <div className="footer-categories">
        <div className="category-column">
          <h4 className="category-title">Near me</h4>
          <p className="category-item">Houses for rent near me</p>
          <h4 className="category-title">Owner</h4>
          <p className="category-item">Houses for rent near me by owner</p>
          <h4 className="category-title">Affordable apartments</h4>
          <p className="category-item">Cheap apartments for rent near me</p>
          <h4 className="category-title">Land</h4>
          <p className="category-item">Land for sale near me</p>
        </div>
        <div className="category-column">
          <h4 className="category-title">New list</h4>
          <p className="category-item">New listing near me</p>
          <h4 className="category-title">Open house</h4>
          <p className="category-item">Open houses near me</p>
          <h4 className="category-title">Price reductions</h4>
          <p className="category-item">Price reductions near me</p>
          <h4 className="category-title">Tours</h4>
          <p className="category-item">Virtual tours near me</p>
        </div>
        <div className="category-column">
          <h4 className="category-title">California</h4>
          <p className="category-item">California real estate</p>
          <h4 className="category-title">Delaware</h4>
          <p className="category-item">Delaware real estate</p>
          <h4 className="category-title">Colorado</h4>
          <p className="category-item">Colorado real estate</p>
          <h4 className="category-title">Georgia</h4>
          <p className="category-item">Georgia real estate</p>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="footer-divider" />

      {/* Bottom Section: Signup and Links */}
      <div className="footer-bottom">
        {/* Left Section: Signup */}
        <div className="signup-container">
          <h2 className="signup-title">
            The better way to <br />
            buy and sell
          </h2>
          <p className="signup-description">Sign up to get the latest from Heavenly</p>
          <div className="signup-form">
            <input
              type="email"
              placeholder="Enter your email..."
              className="signup-input"
            />
            <button className="signup-button">Sign up</button>
          </div>
          <div className="contact-info">
            <p>
              Call Us: <span>888-457-5478</span>
            </p>
            <p>
              Email Us: <span>hallo@musemind.agency</span>
            </p>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className="footer-links">
          <div className="link-column">
            <h4 className="link-title">Buy</h4>
            <p className="link-item">Buy</p>
            <p className="link-item">Exclusives</p>
          </div>
          <div className="link-column">
            <h4 className="link-title">Sell</h4>
            <p className="link-item">Request an offer</p>
            <p className="link-item">Reviews</p>
            <p className="link-item">Customer stories</p>
          </div>
          <div className="link-column">
            <h4 className="link-title">About</h4>
            <p className="link-item">Company</p>
            <p className="link-item">Careers</p>
            <p className="link-item">Contact</p>
            <p className="link-item">Investors</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;