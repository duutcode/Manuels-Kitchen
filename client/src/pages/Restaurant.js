import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Restaurant.css";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart + notify Navbar
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Add item to cart
  const addToCart = (item) => {
    const newCart = [
      ...cart,
      {
        ...item,
        restaurantId: id,
        restaurantName: restaurant.name,
      },
    ];
    saveCart(newCart);
    alert(`${item.name} added to cart!`);
  };

  // Fetch restaurant by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/restaurants/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load restaurant:", err);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  // Not found
  if (!restaurant) {
    return <div className="not-found">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-page">
      {/* Back Button */}
      <Link to="/restaurants" className="back-btn">
        Back to Restaurants
      </Link>

      {/* Header */}
      <div className="restaurant-header">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          onError={(e) => (e.target.src = "/images/placeholder.jpg")}
        />
        <div className="info">
          <h1>{restaurant.name}</h1>
          <p>
            {restaurant.cuisine} • {restaurant.priceRange} • {restaurant.deliveryTime}
          </p>
          <p className="rating">{restaurant.rating} ★</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="menu-section">
        <h2>Menu</h2>

        {restaurant.menu.length === 0 ? (
          <p className="no-menu">Menu coming soon!</p>
        ) : (
          <div className="menu-grid">
            {restaurant.menu.map((item) => (
              <div key={item._id} className="menu-item">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                />
                <h3>{item.name}</h3>

                {/* DESCRIPTION — NOW VISIBLE! */}
                <p className="description">
                  {item.description || "Delicious Ghanaian dish"}
                </p>

                <p className="price">GH₵ {item.price}.00</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}