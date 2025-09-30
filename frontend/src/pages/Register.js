import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/signup", form);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout 
        title='Create Account' 
        subtitle='Join VibeNest today and start connecting with others.'
    >
      <form onSubmit={handleSubmit} className="auth-form-container">
        <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="form-input"
              required
            />
        </div>
        <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="form-input"
              required
            />
        </div>
        <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="form-input"
              required
            />
        </div>
        <button
          type="submit"
          className="form-button" style={{ backgroundColor: '#3B82F6' }} // Match Register button color
        >
          Sign Up
        </button>
      </form>
      <p className="form-footer-link">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
}