import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function RequestOtp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/send-otp", { email });
      alert(res.data.message || "OTP sent successfully! Check your email.");
      navigate("/verify-otp", { state: { email: email } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
        title='Request OTP' 
        subtitle='Securely receive a one-time code to log into your VibeNest account.'
    >
      <form onSubmit={handleSubmit} className="auth-form-container">
        <p className="form-footer-link" style={{ marginBottom: '20px', color: '#666', fontWeight: 'normal' }}>
          Enter your email to receive your secure login code.
        </p>
        <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="form-button" style={{ backgroundColor: '#3B82F6' }} // Match Request button color
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
      
      <p className="form-footer-link" style={{ marginTop: '20px' }}>
        Use password instead?{" "}
        <span
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
}