import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty!");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // CHECK IF TOKEN EXISTS
      if (!token) {
        alert("Please login to place order");
        navigate("/login");
        return;
      }

      const order = {
        items: cart,
        customer: form,
        total
        // status: "pending" → Let backend set it
      };

      const res = await axios.post(
        "http://localhost:5001/api/orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`, // CORRECT FORMAT
            "Content-Type": "application/json"
          }
        }
      );

      // SUCCESS: CLEAR CART
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      // GO TO CONFIRMATION
      navigate("/order-confirmation", { 
        state: { orderId: res.data._id } 
      });

    } catch (err) {
      console.error("Checkout error:", err.response?.data);
      alert(err.response?.data?.msg || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/restaurants")} className="btn-primary">
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.map((item, i) => (
            <div key={i} className="cart-item">
              <p>{item.name}</p>
              <p>GH₵ {item.price}.00</p>
            </div>
          ))}
          <div className="total">
            <strong>Total: GH₵ {total}.00</strong>
          </div>
        </div>

        <div className="checkout-form">
          <h2>Delivery Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone (e.g. 0241234567)"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <textarea
              name="notes"
              placeholder="Optional: Gate code, floor, etc."
              value={form.notes}
              onChange={handleChange}
              rows="3"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="btn-checkout"
            >
              {loading ? "Placing Order..." : `Pay GH₵ ${total}.00`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}