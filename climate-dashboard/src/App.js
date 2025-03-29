import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ClimateData from "./components/ClimateData";
// import Solutions from "./components/Solutions";
// import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/climate-data" element={<ClimateData />} />
        {/* <Route path="/solutions" element={<Solutions />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;


