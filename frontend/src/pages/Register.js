import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import VerifyOtp from "./VerifyOtp";
import apiFetch from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [popup, setPopup] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError(""); 
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch("signup", {
        method: "POST",
        body: JSON.stringify(form),
      });


      localStorage.setItem("token", res.authToken);
      console.log(`${res.authToken}`);


      await new Promise(resolve => setTimeout(resolve, 100));

      const otpRes = await apiFetch("send-otp", { method: "POST" });
      
      if (otpRes.success) {
        setEmailForOtp(form.email);
        setPopup(true);
      }

    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join MeoChat today and start connecting with friends.">
      <VerifyOtp active={popup} email={emailForOtp} onClose={() => setPopup(false)} />

      <form onSubmit={handleSubmit} className="auth-form-container">
        {error && (
          <div style={{
            padding: "12px",
            marginBottom: "16px",
            backgroundColor: "#FEE2E2",
            border: "1px solid #EF4444",
            borderRadius: "6px",
            color: "#DC2626",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={form.username} 
            onChange={handleChange} 
            className="form-input" 
            required 
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            className="form-input" 
            required 
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="form-button" 
          style={{ backgroundColor: loading ? "#93C5FD" : "#3B82F6" }} 
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="form-footer-link" style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span style={{ color: "#3B82F6", cursor: "pointer" }} onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </AuthLayout>
  );
}