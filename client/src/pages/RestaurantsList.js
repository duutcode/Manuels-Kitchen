import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RestaurantsList.css";

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/restaurants')
      .then(res => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch(() => {
        setRestaurants([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading restaurants...</div>;

  return (
    <div className="restaurants-list-page">
      <h1 className="page-title">All Restaurants</h1>
      <div className="restaurants-grid">
        {restaurants.map(r => (
          <Link key={r._id} to={`/restaurant/${r._id}`} className="restaurant-card">
            <img src={r.image} alt={r.name} />
            <div className="info">
              <h3>{r.name}</h3>
              <p>{r.cuisine} • {r.priceRange}</p>
              <p>{r.deliveryTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}