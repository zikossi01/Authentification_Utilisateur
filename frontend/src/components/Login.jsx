import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) newErrors.email = 'Please fill in your email';
    if (!password) newErrors.password = 'Please fill in your password';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      alert('Login successful!');
      setTimeout(() => navigate("/soon"), 1000);
    } catch (err) {
      setErrors({ server: 'Invalid email or password' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-600 to-teal-800 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>

          {errors.server && <div className="text-red-500 text-center">{errors.server}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-lg hover:from-teal-400 hover:to-teal-600 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            Don't have an account? 
            <Link to="/signup" className="text-teal-500 hover:text-teal-700 transition duration-300">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
