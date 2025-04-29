import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TemperatureChart from "./components/TemperatureChart";
import ClimateSolutionsPage from "./components/Solutions";
import CO2Map from "./components/CO2Map";
import CountryPage from "./components/CountryPage";
import FloodEventMap from "./components/FloodEventsMap";
// import Solutions from "./components/Solutions";
// import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temperature-chart" element={<TemperatureChart />} />
        <Route path="/co2-map" element={<CO2Map />} />
        <Route path="/country/:countryCode" element={<CountryPage />} />
        <Route path="/climate-solutions" element={<ClimateSolutionsPage />} />
        <Route path='/flood-events' element={<FloodEventMap />} />
      </Routes>
    </Router>
  );
};

export default App;


