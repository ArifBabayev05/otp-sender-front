import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./otp.css";

function OTP() {
  const [otp, setOtp] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const navigate = useNavigate();
  const hasSentOTP = useRef(false); // Using ref to track OTP sending status

  // Function to send OTP to the email
  const sendOTP = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/sendEmailOTP', { email });
      if (response.data.success) {
        setIsOTPSent(true); // Update state to indicate OTP has been sent
        toast.success('OTP sent successfully to your email!');
      } else {
        toast.error('Failed to send OTP to email.');
      }
    } catch (error) {
      toast.error('Error sending OTP. Try again.');
      console.error('Error sending OTP:', error);
    }
  };

  // Function to handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const email = JSON.parse(localStorage.getItem('user')).email; // Get email from local storage
      const response = await axios.post('http://localhost:5000/verifyEmailOTP', { email, otp });
      if (response.data.success) {
        toast.success("OTP verified successfully!");
        window.location.href = 'https://livable-app.vercel.app/';
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to verify OTP.');
      console.error(error);
    }
  };

  // UseEffect to send OTP when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage
    if (user && user.email) {
      // Only send OTP if it hasn't been sent already
      if (!hasSentOTP.current) {
        sendOTP(user.email); // Automatically send OTP
        hasSentOTP.current = true; // Mark OTP as sent
        
      }
    } else {
      toast.error('Email not found. Navigating to login.');
      navigate('/login'); // Navigate to login page if email does not exist
    }
  }, [navigate]); // Only navigate if there's an update in user state

  return (
    <div className="otp-container">
      <h2>Email OTP Verification</h2>
      <ToastContainer />
      {!isOTPSent ? (
        <p>Sending OTP to your email...</p> // Feedback while sending OTP
      ) : (
        <div>
          <p>Enter the OTP sent to your email:</p>
          <form onSubmit={handleVerifyOTP}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default OTP;
