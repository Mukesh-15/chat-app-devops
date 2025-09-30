import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../api";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res.success) return alert(res.message || "Login failed");

      localStorage.setItem("token", res.authToken);
      login(res.user || {}, res.authToken);

      if (res.isVerified) {
        alert("Login Successful & Verified");
        navigate("/");
      } else {
        alert("Login Successful but Not Verified");
        navigate("/VerifyOtp");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to VibeNest to continue connecting with your friends."
    >
      <form onSubmit={handleSubmit} className="auth-form-container">
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
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
            value={form.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>

      <div className="form-separator">OR</div>

      <p className="form-footer-link">
        <span style={{ color: "#3B82F6", cursor: "pointer" }} onClick={() => navigate("/request-otp")}>
          Login with OTP
        </span>
      </p>

      <p className="form-footer-link" style={{ marginTop: "10px" }}>
        Don’t have an account?{" "}
        <span style={{ color: "#3B82F6", cursor: "pointer" }} onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </AuthLayout>
  );
}
