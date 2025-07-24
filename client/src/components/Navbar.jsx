import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import searchIcon from "../assets/searchIcon.svg";
import userIcon from "../assets/userIcon.svg";
  import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar-container sticky-navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-logo">
          <img
            src={logo}
            alt="logo"
            style={{ height: '40px', width: 'auto', display: 'block' }}
          />
          <span className="navbar-brand" style={{ color: '#111', fontWeight: 'bold', fontSize: '2rem', fontFamily: 'Playfair, serif' }}></span>
        </a>
      </div>
      <div className="navbar-links">
        <a href="/" className="navbar-link">Home</a>
        <a href="/hotels" className="navbar-link">Hotels</a>
        <a href="/experiences" className="navbar-link">Experiences</a>
        <a href="/about" className="navbar-link">About</a>
      </div>
      <div className="navbar-actions">
        <img src={searchIcon} alt="search" className="navbar-icon" />
        {!user ? (
          <>
            <button onClick={() => navigate('/signin')} className="navbar-btn-login" style={{marginRight: '0.5rem'}}>Sign In</button>
            <button onClick={() => navigate('/login')} className="navbar-btn-login">Login</button>
          </>
        ) : (
          <div className="navbar-profile">
            <span onClick={() => navigate('/profile')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
              <img src={userIcon} alt="profile" className="navbar-icon" />
            </span>
            <span className="navbar-user-email">{user.email}</span>
            <button onClick={logout} className="navbar-btn-login">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;