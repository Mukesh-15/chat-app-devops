import React, { useState, useContext, useEffect } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function VerifyOtp() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const userEmail = location.state?.email; 
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (!userEmail) {
          navigate("/request-otp");
      }
  }, [userEmail, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/verify-otp", { email: userEmail, otp }); 
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!userEmail) return null; 

  return (
    <AuthLayout 
        title='Verify Code' 
        subtitle={`Enter the 6-digit code sent to ${userEmail}.`}
    >
      <form onSubmit={handleSubmit} className="auth-form-container">
        <p className="form-footer-link" style={{ marginBottom: '20px', color: '#666', fontWeight: 'normal' }}>
          Enter the code below to complete your login.
        </p>
        <div className="form-group">
            <input
              type="text"
              name="otp"
              placeholder="6-digit Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              className="form-input"
              style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px' }} // Custom style for OTP visual
              required
            />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="form-button"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>

      <p className="form-footer-link" style={{ marginTop: '20px' }}>
        Didn't receive the code?{" "}
        <span
          style={{ color: '#3B82F6' }} // Custom link color for Resend
          onClick={() => navigate("/request-otp")}
        >
          Resend OTP
        </span>
      </p>
    </AuthLayout>
  );
}