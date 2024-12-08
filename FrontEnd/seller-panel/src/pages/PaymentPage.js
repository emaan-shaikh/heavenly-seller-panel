import React, { useState } from "react";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 2000); // Simulate processing time
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const renderProgress = () => {
    return (
      <div className="progress-tracker">
        <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`progress-bar ${step >= 2 ? "active" : ""}`}></div>
        <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`progress-bar ${step === 3 ? "active" : ""}`}></div>
        <div className={`progress-step ${step === 3 ? "active" : ""}`}>3</div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="payment-step">
            <h2>Enter Payment Details</h2>
            <form>
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </label>
              <label>
                Expiry Date:
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </label>
              <label>
                CVV:
                <input
                  type="password"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </label>
              <label>
                Name on Card:
                <input
                  type="text"
                  name="name"
                  value={paymentDetails.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                />
              </label>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="payment-step">
            <h2>Review and Confirm</h2>
            <ul>
              <li>
                <strong>Card Number:</strong> **** **** ****{" "}
                {paymentDetails.cardNumber.slice(-4)}
              </li>
              <li>
                <strong>Expiry Date:</strong> {paymentDetails.expiryDate}
              </li>
              <li>
                <strong>Name on Card:</strong> {paymentDetails.name}
              </li>
            </ul>
            <p>Please review your payment details and confirm to proceed.</p>
          </div>
        );
      case 3:
        return (
          <div className="payment-confirmation">
            <h2>Payment Successful!</h2>
            <p>Thank you for your payment.</p>
            <p>Your transaction has been completed.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-page">
      {renderProgress()}
      {loading ? (
        <div className="loading-spinner">Processing...</div>
      ) : (
        renderStepContent()
      )}
      <div className="payment-actions">
        {step > 1 && step < 3 && (
          <button className="back-button" onClick={handlePreviousStep}>
            Back
          </button>
        )}
        {step < 3 && (
          <button className="next-button" onClick={handleNextStep}>
            {step === 2 ? "Confirm Payment" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
