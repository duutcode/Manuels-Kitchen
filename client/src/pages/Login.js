import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
  const newErrors = {};
  if (!form.email.includes("@")) newErrors.email = "Valid email required";
  if (form.password.length < 8) newErrors.password = "Password too short";
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
    const res = await axios.post("http://localhost:5001/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    alert("Login successful!");
    navigate("/");
  } catch (err) {
    setErrors({ general: err.response?.data?.msg || "Login failed" });
  }
  };

  return (
  <div className="auth-page">
    <div className="auth-card">
    <h2>Login to Manuel's Kitchen</h2>

    {errors.general && <div className="error-general">{errors.general}</div>}

    <form onSubmit={handleSubmit}>
      <div className="input-group">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <small className="error">{errors.email}</small>}
      </div>

      <div className="input-group password-group">
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button
        type="button"
        className="toggle-password"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {errors.password && <small className="error">{errors.password}</small>}
      </div>

      <button type="submit" className="auth-btn">Login</button>
    </form>

    <div className="auth-links">
      <Link to="/forgot-password" className="link">Forgot password?</Link>
      <p>
      New here? <Link to="/register" className="link">Create an account</Link>
      </p>
    </div>
    </div>
  </div>
  );
}