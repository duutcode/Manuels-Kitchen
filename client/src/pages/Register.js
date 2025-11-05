import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: ""  // ← ADDED
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = "10-digit phone number";
    if (!form.password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/))
      newErrors.password = "8+ chars: letters, numbers, special (!@#$%)";
    if (!form.address) newErrors.address = "Delivery address is required"; // ← ADDED
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", form);
      localStorage.setItem("token", res.data.token);
      alert("Registered successfully! Welcome to Manuel's Kitchen!");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      alert(err.response?.data?.msg || "Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <small className="error">{errors.name}</small>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <input
            name="phone"
            placeholder="Phone (10 digits)"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <small className="error">{errors.phone}</small>}

          <input
            name="password"
            type="password"
            placeholder="Password (8+ chars: letters, numbers, !@#$%)"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <small className="error">{errors.password}</small>}

          {/* ← NEW FIELD */}
          <input
            name="address"
            placeholder="Delivery Address (e.g. House 12, Spintex)"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <small className="error">{errors.address}</small>}

          <button type="submit" className="auth-btn">Register</button>
        </form>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}