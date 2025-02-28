import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:5000/auth/login', loginData);

      // On successful login, save the token to localStorage (or state management)
      localStorage.setItem('authToken', response.data.token);

      // Optionally, you can redirect to a protected page after login
      alert('Login successful!');
      console.log('Login Response:', response.data);  // The JWT token returned here
      setTimeout(() => navigate("/soon"), 1000);
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response ? err.response.data.message : 'Server error');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email Address" 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="w-full p-2 border rounded" 
        />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        <p className="text-center text-gray-300">
            Don't have an account? <Link to="/signup" className="underline text-blue-400 hover:text-blue-500 transition duration-300">Register</Link>
          </p>
      </form>
    </div>
  );
};

export default Login;
