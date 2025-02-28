import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',  // New field for password confirmation
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email format
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if any fields are missing
    if (!formData.name || !formData.phone || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setError(''); // Reset error message if no issues

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      // Handle successful signup
      alert('Account created successfully!');
      console.log('Signup Response:', response.data);  // The JWT token returned here
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error('Error signing up:', err);
      setError('Server error, please try again later');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Full Name" 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="text" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          placeholder="Phone Number" 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Email Address" 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Password" 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          placeholder="Confirm Password"  // Password confirmation input
          className="w-full p-2 border rounded" 
        />
        
        {error && <div className="text-red-500">{error}</div>}
        
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>

        <p className="text-center text-gray-300">
          Already have an account? 
          <Link to="/login" className="underline text-blue-400 hover:text-blue-500 transition duration-300">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
