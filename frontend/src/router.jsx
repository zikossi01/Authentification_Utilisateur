import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './components/Signup';
function router() {
  return (
    <Router>
    <Routes>
      {/* Default route for ComingSoon page */}
      <Route path="/" element={<ComingSoon />} />
      
      {/* Other routes */}
      <Route path="/signup" element={<Signup />} /> 
    </Routes>
  </Router>
  )
}

export default Router