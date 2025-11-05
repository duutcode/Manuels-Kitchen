import React from "react";
import { FaHeart, FaTruck, FaLeaf, FaUsers } from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About <span className="highlight">Manuel's Kitchen</span></h1>
        <p>Authentic Ghanaian cuisine delivered with love.</p>
      </section>

      <section className="story">
        <div className="container">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              <strong>Manuel's Kitchen</strong> brings the rich flavors of Ghana to your doorstep. 
              From traditional fufu to spicy jollof, we serve authentic dishes made with fresh local ingredients.
            </p>
            <p>
              Our mission is simple: deliver joy in every bite, fast and fresh.
            </p>
          </div>
          <img src="/images/about-chef.jpg" alt="Chef" className="story-img" />
        </div>
      </section>

      <section className="values">
        <h2>Why Choose Us?</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaHeart className="icon" />
            <h3>Authentic Taste</h3>
            <p>Traditional Ghanaian recipes made with love.</p>
          </div>
          <div className="value-card">
            <FaTruck className="icon" />
            <h3>Fast Delivery</h3>
            <p>Hot meals in 15-20 minutes across Accra.</p>
          </div>
          <div className="value-card">
            <FaLeaf className="icon" />
            <h3>Fresh Ingredients</h3>
            <p>Sourced daily from local markets.</p>
          </div>
          <div className="value-card">
            <FaUsers className="icon" />
            <h3>20k+ Customers</h3>
            <p>Join our growing family of food lovers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}