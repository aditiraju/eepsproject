import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ClimateData from "./components/ClimateData";
import TemperatureChart from "./components/TemperatureChart";
import CO2EmissionsChart from "./components/CO2EmissionChart";
import CO2Map from "./components/CO2Map";
import CountryPage from "./components/CountryPage";
// import Solutions from "./components/Solutions";
// import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/climate-data" element={<ClimateData />} />
        <Route path="/temperature-chart" element={<TemperatureChart />} />
        <Route path="/co2-emissions-chart" element={<CO2EmissionsChart />} />
        <Route path="/co2-map" element={<CO2Map />} />
        <Route path="/country/:countryCode" element={<CountryPage />} />
        {/* <Route path="/solutions" element={<Solutions />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;


