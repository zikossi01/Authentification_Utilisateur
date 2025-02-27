import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [timer, setTimer] = useState(0);
  
  useEffect(() => {
    const countdownDate = new Date('2025-03-01').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      if (distance <= 0) {
        clearInterval(interval);
        setTimer(0);
      } else {
        setTimer(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const days = Math.floor(timer / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timer % (1000 * 60)) / 1000);

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6">Coming Soon</h1>
      <div className="text-3xl font-semibold mb-6">
        {days}d {hours}h {minutes}m {seconds}s
      </div>
      <div className="mb-6">
        <input 
          type="email" 
          placeholder="Enter your email for updates" 
          className="p-2 rounded text-black"
        />
        <button className="ml-4 p-2 bg-blue-500 text-white rounded">Subscribe</button>
      </div>
      <div className="animate-pulse text-xl">Stay tuned for something amazing!</div>
    </div>
  );
};

export default ComingSoon;
