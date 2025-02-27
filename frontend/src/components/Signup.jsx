import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check for missing fields
    if (!formData.name || !formData.phone || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setError(''); // Reset error message if no issues

    // Call your backend API for signup here (this is just an example)
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully signed up, you can redirect the user or show success message
        alert('Account created successfully!');
      } else {
        // Show any errors returned from the backend
        setError(data.message || 'Something went wrong, please try again');
      }
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
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
