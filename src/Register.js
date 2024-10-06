import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData)); // Save credentials to localStorage
    navigate('/login'); // Redirect to login page after registration
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo">
        </div>
        <h2>Welcome</h2>
        <p>Please enter your contact details to start.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="name surname"
              required
            />
          </div>
          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="**********"
              required
            />
          </div>
          <button className="login-button" type="submit">Sign up</button>
        </form>
        <p>
          Have an account? <a href="/login">Log in here</a>
        </p>
      </div>
      <div className="login-image">
        <img src={require('./img/2.png')} alt="Nature" />
      </div>
    </div>
  );
}

export default Register;
