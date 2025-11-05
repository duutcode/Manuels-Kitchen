import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderId = state?.orderId || "N/A";

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <FaCheckCircle className="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <p>Your delicious Ghanaian meal is on the way!</p>
        
        <div className="order-details">
          <p><strong>Order ID:</strong> #{orderId.slice(-6).toUpperCase()}</p>
          <p><strong>Status:</strong> <span className="status">Preparing</span></p>
        </div>

        <div className="actions">
          <Link to="/orders" className="btn-primary">View My Orders</Link>
          <Link to="/" className="btn-secondary">Back to Home</Link>
        </div>

        <p className="thank-you">
          Thank you for choosing <strong>Manuel's Kitchen</strong>!
        </p>
      </div>
    </div>
  );
}