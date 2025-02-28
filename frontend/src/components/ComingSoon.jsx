import React, { useState } from 'react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address to subscribe');
      return;
    }

    alert('You have subscribed successfully!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-extrabold text-indigo-500 mb-8">Coming Soon</h1>
      <div className="text-4xl font-semibold mb-8">Stay tuned for updates!</div>

      <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-3 w-80 text-lg rounded-md shadow-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <button
          type="submit"
          className="mt-4 py-3 px-8 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Subscribe
        </button>
      </form>

      <p className="text-lg">We will notify you once we are live!</p>
    </div>
  );
};

export default ComingSoon;
