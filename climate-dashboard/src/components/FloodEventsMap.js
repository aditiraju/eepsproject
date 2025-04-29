// src/components/FloodEventMap.js
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import Papa from "papaparse";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// TopoJSON world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const getColorByExposure = (exposed) => {
  if (exposed > 100000) return "red";
  if (exposed > 10000) return "yellow";
  if (exposed > 100) return "blue";
  if (exposed > 1) return "gray";
  return "None";
};


const getRadiusByExposure = (exposed) => {
    if (!exposed || exposed <= 0) return 0;
    if (exposed > 100000) return 25;   // >10 million → huge flood
    if (exposed > 10000) return 16;     // >1 million
    if (exposed > 1000) return 12;      // >100k
    if (exposed > 100) return 8;        // >10k
    if (exposed > 10) return 5;         // >1k
    if (exposed > 1) return 3;          // >100
    return 0;                             // everything smaller
  };
  

const FloodEventMap = () => {
  const [floodEvents, setFloodEvents] = useState([]);
  const [countryCoordinates, setCountryCoordinates] = useState({});
  const [selectedYear, setSelectedYear] = useState(2000);

  // Load flood event CSV
  useEffect(() => {
    fetch("/compiled_pop_ghsl_ts_2019_08_04.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setFloodEvents(results.data);
          },
        });
      })
      .catch((err) => {
        console.error("Error loading flood CSV:", err);
      });
  }, []);

  // Load country coordinates CSV
  useEffect(() => {
    fetch("/longitude-latitude.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const coords = {};
            results.data.forEach((row) => {
              if (row.Country && row.Latitude && row.Longitude) {
                coords[row.Country.trim().toUpperCase()] = [
                  parseFloat(row.Longitude),
                  parseFloat(row.Latitude),
                ];
              }
            });
            setCountryCoordinates(coords);
          },
        });
      })
      .catch((err) => {
        console.error("Error loading coordinates CSV:", err);
      });
  }, []);

  const eventsThisYear = floodEvents.filter(
    (e) => parseInt(e.year) === selectedYear
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Flood Events in {selectedYear}
      </h2>

      <div style={{ width: "600px", margin: "0 auto", marginBottom: "20px" }}>
        <Slider
          min={2000}
          max={2018}
          value={selectedYear}
          onChange={(value) => setSelectedYear(value)}
          marks={{ 2000: "2000", 2010: "2010", 2018: "2018" }}
        />
      </div>

      <ComposableMap
        projectionConfig={{ scale: 200 }}
        style={{ width: "100%", height: "600px" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#E0E0E0", outline: "none" },
                  hover: { fill: "#87CEEB", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Drop markers */}
        {eventsThisYear.map((event, index) => {
          const countryName = event.country?.trim().toUpperCase();
          const coords = countryCoordinates[countryName];

          if (!coords) return null;

          return (
            <Marker key={index} coordinates={coords}>
              <circle
                r={getRadiusByExposure(parseFloat(event.exposed))}
                fillOpacity={0.6}
                fill={getColorByExposure(parseFloat(event.exposed))}
                stroke="#000"
                strokeWidth={0.5}
              />
            </Marker>
          );
        })}
      </ComposableMap>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
            Legend: Flood Exposure Circle Size
        </h3>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "40px" }}>
            {/* Small Flood */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg height="30" width="30">
                <circle cx="15" cy="15" r="5" fill="blue" fillOpacity="0.5" stroke="#000" strokeWidth="0.5" />
            </svg>
            <span style={{ fontSize: "14px" }}>Small</span>
            </div>

            {/* Medium Flood */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg height="40" width="40">
                <circle cx="20" cy="20" r="10" fill="orange" fillOpacity="0.5" stroke="#000" strokeWidth="0.5" />
            </svg>
            <span style={{ fontSize: "14px" }}>Medium</span>
            </div>

            {/* Large Flood */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg height="50" width="50">
                <circle cx="25" cy="25" r="15" fill="red" fillOpacity="0.5" stroke="#000" strokeWidth="0.5" />
            </svg>
            <span style={{ fontSize: "14px" }}>Large</span>
            </div>
        </div>
        </div>

    </div>
  );
};

export default FloodEventMap;




