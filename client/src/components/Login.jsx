import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext.jsx";
import googleIcon from "../assets/googleIcon.svg";
import facebookIcon from "../assets/facebookIcon.svg";
import eyeIcon from "../assets/eyeIcon.svg";
import eyeOffIcon from "../assets/eyeOffIcon.svg";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConstraints, setShowConstraints] = useState(false);
  const otpNotificationShown = useRef(false);

  const passwordConstraints = [
    { test: (v) => v.length >= 8, label: "At least 8 characters" },
    { test: (v) => /[A-Z]/.test(v), label: "One uppercase letter" },
    { test: (v) => /[a-z]/.test(v), label: "One lowercase letter" },
    { test: (v) => /[0-9]/.test(v), label: "One number" },
    { test: (v) => /[^A-Za-z0-9]/.test(v), label: "One special character" },
  ];

  const metCount = passwordConstraints.filter((c) => c.test(password)).length;
  const isPasswordValid = metCount >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConstraints(false);
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    if (!isPasswordValid) {
      setError("Password does not meet enough constraints.");
      setShowConstraints(true);
      return;
    }
    login({ email });
    navigate("/");
  };

  const handleGoogleLogin = () => {
    // Dummy Google login
    login({ email: "googleuser@gmail.com" });
  };

  const handleFacebookLogin = () => {
    // Dummy Facebook login
    login({ email: "facebookuser@gmail.com" });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            onFocus={() => setPasswordTouched(true)}
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword((v) => !v)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={showPassword ? eyeOffIcon : eyeIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              height={20}
              width={20}
            />
          </span>
        </div>
        {showConstraints && (
          <div className="password-constraints">
            {passwordConstraints.map((c) => (
              <div
                key={c.label}
                className={c.test(password) ? "constraint-met" : "constraint-unmet"}
              >
                {c.label}
              </div>
            ))}
          </div>
        )}
        <button type="submit">Login</button>
        {error && <div className="login-error">{error}</div>}
      </form>
      <div className="login-social">
        <button onClick={handleGoogleLogin} className="login-social-btn">
          <img src={googleIcon} alt="Google" height={20} width={20} /> Google
        </button>
        <button onClick={handleFacebookLogin} className="login-social-btn">
          <img src={facebookIcon} alt="Facebook" height={20} width={20} /> Facebook
        </button>
      </div>
      <div className="login-otp">
        <button
          onClick={async () => {
            if (!email) {
              setError('Please enter your email to receive OTP.');
              return;
            }
            setError("");
            try {
              const response = await fetch('http://localhost:5000/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
              });
              const data = await response.json();
              if (data.success) {
                if (!otpNotificationShown.current) {
                  alert(`OTP sent to ${email}`);
                  otpNotificationShown.current = true;
                }
                navigate('/otp-verify', { state: { email } });
              } else {
                setError('Failed to send OTP. Try again.');
              }
            } catch (err) {
              setError('Error sending OTP.');
            }
          }}
        >
          Forgot password? Get OTP
        </button>
      </div>
    </div>
  );
};

export default Login;
