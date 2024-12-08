import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/NextSteps.css";

const NextSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const buyerEmail = location.state?.buyerEmail || "unknown@example.com";
  const message = location.state?.message || "Proceed with the transaction steps below.";

  const proceedToPayment = () => {
    navigate("/payment"); // Navigate to the payment page
  };

  return (
    <div className="next-steps-container">
      <h1>Next Steps</h1>
      <p>{message}</p>
      <div className="next-steps-details">
        <h2>Steps to Proceed:</h2>
        <ol>
          <li>Contact the buyer at: <strong>{buyerEmail}</strong></li>
          <li>Discuss property details and finalize the agreement.</li>
          <li>Confirm all required documentation for the transaction.</li>
          <li>Once ready, click the button below to proceed to payment.</li>
        </ol>
      </div>
      <button className="proceed-to-payment-button" onClick={proceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default NextSteps;
