import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout 
        title='Welcome Back' 
        subtitle='Login to VibeNest to continue connecting with your friends.'
    >
      {/* Form elements use the new standard CSS classes */}
      <form onSubmit={handleSubmit} className="auth-form-container">
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
          className="form-button"
        >
          Login
        </button>
      </form>
      
      <div className="form-separator">OR</div>

      <p className="form-footer-link">
        <span
          style={{ color: '#3B82F6' }} // Custom link color for OTP
          onClick={() => navigate("/request-otp")}
        >
          Login with OTP
        </span>
      </p>
      
      <p className="form-footer-link" style={{ marginTop: '10px' }}>
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </AuthLayout>
  );
}