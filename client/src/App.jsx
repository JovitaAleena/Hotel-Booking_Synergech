import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hotels from './components/Hotels';
import Navbar from './components/Navbar';
import Home from './Home';
import Login from './components/Login';
import SignIn from './components/SignIn';
import OtpVerify from './components/OtpVerify';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </div>
  );
}

export default App;
