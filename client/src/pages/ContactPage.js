// client/src/pages/ContactPage.js
import React, { useState } from "react";
import "./ContactPage.css";
import { FaEnvelope, FaUser, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage("Thank you! We received your message. We'll get back soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSuccessMessage("Error: " + (data.error || "Please try again."));
      }
    } catch (err) {
      setSuccessMessage("Network error. Please check your connection.");
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 6000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        {/* Contact Form */}
        <div className="contact-container">
          <h2><FaCommentDots /> Contact Us</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>

          {successMessage && (
            <div className={`success ${successMessage.includes("Error") ? "error" : ""}`}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <FaCommentDots className="input-icon" />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <FaCommentDots className="input-icon" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                disabled={loading}
              ></textarea>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="map-container">
          <div className="map-header">
            <FaMapMarkerAlt /> <strong>Visit Us in Accra</strong>
          </div>
          <iframe
            title="Manuel's Kitchen Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.486496788816!2d-0.20587498530845618!3d5.560014195964443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102081b5e1b9a3c5%3A0x37f5a42c6a1f66bb!2sOsu%20Oxford%20Street%2C%20Accra!5e0!3m2!1sen!2sgh!4v1695829719942!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;