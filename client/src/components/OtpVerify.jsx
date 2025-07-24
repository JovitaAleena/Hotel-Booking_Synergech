import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext.jsx";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const email = location.state?.email || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP sent to your email.");
      return;
    }
    setError("");
    // Simulate OTP verification success
    login({ email });
    alert("OTP verified! Redirecting to Home page.");
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
        />
        <button type="submit">Submit</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default OtpVerify;
