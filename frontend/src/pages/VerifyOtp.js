import React, { useState } from "react";
import apiFetch from "../api";
import "./VerifyOtp.css";

export default function VerifyOtp({ active, onClose }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!active) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch("verify-otp", { method: "POST", body: JSON.stringify({ otp }) });
      alert(res.message || "OTP verified successfully");
      onClose();
    } catch (err) {
      alert(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await apiFetch("send-otp", { method: "POST" });
      alert(res.message || "OTP resent successfully");
    } catch (err) {
      alert(err.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-container">
        <div className="otp-box">
          <div className="otp-header">
            <h2>OTP Verification</h2>
            <p>We’ve sent a 6-digit code to your email. Please enter it below.</p>
          </div>
          <form className="otp-form" onSubmit={handleSubmit}>
            <input type="text" maxLength="6" inputMode="numeric" placeholder="Enter 6-digit OTP" className="otp-input" required value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button type="submit" className="otp-button" disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
          </form>
          <p className="otp-resend">
            Didn’t receive the code? <button className="otp-resend-btn" onClick={resendOtp}>Resend</button>
          </p>
        </div>
      </div>
    </div>
  );
}
