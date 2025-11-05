import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ADDED useNavigate
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // NEW

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated")); // UPDATE NAVBAR
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated")); // UPDATE NAVBAR
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <h1>Your Cart is Empty</h1>
        <Link to="/restaurants" className="btn">Order Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart ({cart.length})</h1>
      <div className="cart-items">
        {cart.map((item, i) => (
          <div key={i} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="info">
              <h3>{item.name}</h3>
              <p>{item.restaurantName}</p>
              <p className="price">GH₵ {item.price}.00</p>
            </div>
            <button onClick={() => removeFromCart(i)} className="remove">×</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <p>Total: <strong>GH₵ {total}.00</strong></p>
        <button onClick={goToCheckout} className="checkout">
          Proceed to Checkout
        </button>
        <button onClick={clearCart} className="clear">Clear Cart</button>
      </div>
    </div>
  );
}