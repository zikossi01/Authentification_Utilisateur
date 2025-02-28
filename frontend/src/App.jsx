import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // use Routes instead of Switch in React Router v6
import Signup from "./components/Signup";  // Update path to reflect folder structure
import Login from "./components/Login";  // Update path to reflect folder structure
import ComingSoon from "./components/ComingSoon";  // Update path to reflect folder structure

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch in React Router v6 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/soon" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
};

export default App;
