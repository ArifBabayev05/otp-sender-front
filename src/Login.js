import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      toast.success('Login successful!');
      navigate('/otp'); // Navigate to OTP page
    } else {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-form">
        <div className="logo">
        </div>
        <h2>Welcome back</h2>
        <p>Please enter your contact details to continue.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              required
            />
          </div>
          <button className="login-button" type="submit">Log in</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Sign up here</a>
        </p>
      </div>
      <div className="login-image">
        <img src={require('./img/1.png')} alt="Nature" />
      </div>
    </div>
  );
}

export default Login;
