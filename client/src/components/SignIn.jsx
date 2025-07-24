import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Login.css";
import eyeIcon from "../assets/eyeIcon.svg";
import eyeOffIcon from "../assets/eyeOffIcon.svg";
import googleIcon from "../assets/googleIcon.svg";
import facebookIcon from "../assets/facebookIcon.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConstraints, setShowConstraints] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
    login({ email });
    alert("Account created! (Simulated)");
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
        {error && <div className="login-error">{error}</div>}
      </form>
      <div className="login-social">
        <button className="login-social-btn" onClick={() => alert('Google sign in (simulated)')}>
          <img src={googleIcon} alt="Google" height={20} width={20} /> Google
        </button>
        <button className="login-social-btn" onClick={() => alert('Facebook sign in (simulated)')}>
          <img src={facebookIcon} alt="Facebook" height={20} width={20} /> Facebook
        </button>
      </div>
    </div>
  );
};

export default SignIn;
