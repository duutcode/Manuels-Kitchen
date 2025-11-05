// client/src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  FaUsers, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope 
} from "react-icons/fa";
import "./HomePage.css";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/restaurants');
        setRestaurants(res.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setRestaurants([]);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="loading">Loading delicious Ghanaian spots...</div>;
  }

  return (
    <div className="page-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="left-section">
          <h1 className="restaurant-title">Manuel's Kitchen</h1>
          <p className="restaurant-description">
            Fresh Ghanaian & local dishes delivered in 15–35 mins!
          </p>

          <div className="restaurant-stats">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <span className="stat-number">20k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <FaClock className="stat-icon" />
              <span className="stat-number">15–35 min</span>
              <span className="stat-label">Avg. Delivery</span>
            </div>
          </div>

          <Link to="/restaurants" className="order-now-btn">
            Order Now
          </Link>
        </div>

        <div className="right-section">
          <div className="featured-meal">
            <img 
              src="/images/waakye.jpg" 
              alt="Waakye" 
              className="featured-food-image"
              onError={(e) => e.target.src = "/images/placeholder.jpg"}
            />
            <div className="featured-meal-info">
              <h3 className="meal-name">Waakye</h3>
              <p className="meal-price">GH₵ 50.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* TOP RESTAURANTS FROM API */}
      <section className="meal-section">
        <h2>Top Restaurants in Accra</h2>
        
        {restaurants.length === 0 ? (
          <p className="no-restaurants">No restaurants available right now.</p>
        ) : (
          <div className="meal-grid">
            {restaurants.map(r => (
              <div key={r._id} className="meal-card">
                <Link 
                  to={`/restaurant/${r._id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img 
                    src={r.image} 
                    alt={r.name}
                    onError={(e) => e.target.src = "/images/placeholder.jpg"}
                  />
                  <h3>{r.name}</h3>
                  <p>{r.cuisine} • {r.priceRange} • {r.deliveryTime}</p>
                  <div className="rating">★ {r.rating}</div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER WITH ICONS */}
      <footer className="footer">
        <div className="footer-section about">
          <h3>Manuel's Kitchen</h3>
          <p>
            Authentic Ghanaian flavors, crafted with love. Fast delivery, fresh ingredients,
            and unforgettable taste — every time.
          </p>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt className="footer-icon" /> 123 Cluster6 Street, Accra, Ghana</p>
          <p><FaPhoneAlt className="footer-icon" /> +233 548194009</p>
          <p><FaEnvelope className="footer-icon" /> info@manuelskitchen.com</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}