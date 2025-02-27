import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your backend API for login and generate JWT
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
        <div className="text-center mt-4">or login with</div>
        <div className="flex justify-around mt-4">
          <button className="p-2 bg-red-500 text-white rounded">Google</button>
          <button className="p-2 bg-gray-900 text-white rounded">GitHub</button>
          <button className="p-2 bg-blue-600 text-white rounded">Facebook</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
