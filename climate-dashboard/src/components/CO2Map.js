// src/components/CO2Map.js
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Papa from "papaparse";
import { scaleLinear } from "d3-scale";
import {Tooltip} from "react-tooltip";
import { useNavigate } from "react-router-dom";

// TopoJSON file for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CO2Map = () => {
  const [emissionsData, setEmissionsData] = useState({});
  // const [tooltipContent, setTooltipContent] = useState("");
  const [selectedYear, setSelectedYear] = useState("2019"); // Default year
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch("/annual-co-emissions-by-region.csv");
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });

    const tempData = {};

    parsed.data.forEach(row => {
        const year = row.Year;
        const code = row.Entity.trim().toUpperCase() ? row.Entity.toUpperCase() : null;

        if (year && code) {
        if (!tempData[year]) {
            tempData[year] = {};
        }
        tempData[year][code] = parseFloat(row["Annual CO2 emissions"]) || 0;
        }

        //console.log("Full parsed emissions data:", tempData);
        setEmissionsData(tempData); // Store all years
    });

    

    //   // Create a map: { countryCode: latestEmissionValue }
    //   const emissionsMap = {};
    // //   parsed.data.forEach(row => {
    // //     if (row.Year === "2019") { // Pick latest year available
    // //       emissionsMap[row.Code] = parseFloat(row["Annual CO2 emissions"]) || 0;
    // //     }
    // //   });
    //   parsed.data.forEach(row => {
    //     if (row.Year === selectedYear && row.Entity && row.Entity.trim() !== "") {
    //       emissionsMap[row.Entity.trim().toUpperCase()] = parseFloat(row["Annual CO2 emissions"]) || 0;
    //     }
    //   });
      
    // console.log("Parsed CO2 emissions data:", parsed.data);
    //   setEmissionsData(emissionsMap);
    };

    fetchData();
  }, []);




return (
    <div style={{display: "flex", flexDirection: "column", textAlign: "center", padding: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", textAlign: "center", padding: "10px" }}>
            <h2 >
                World CO₂ Emissions Map ({selectedYear})
            </h2>
            
            <div style={{ width: "200px", margin: "0 auto" }}>
                <input
                type="range"
                min="1750"
                max="2019"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full h-4 rounded-lg appearance-none bg-gray-200 accent-blue-500 cursor-pointer"
                />
                
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", marginTop: "4px" }}>
                <span>1750</span>
                <span>2019</span>
                </div>
            </div>
        </div>


        

        <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        const countryCode = (geo.properties.iso_a3 || geo.properties.name || "").toUpperCase();

                        if (!countryCode) return null; // skip if still blank
                        const emissions = emissionsData[selectedYear]?.[countryCode] || 0;

                        const fillColor =
                            emissions > 5_000_000_000
                                ? "#8b0000" // Very High (dark red)
                                : emissions > 1_000_000_000
                                ? "#ff3c3c" // High (bright red)
                                : emissions > 100_000_000
                                ? "#ffa500" // Medium (orange)
                                : emissions > 10_000_000
                                ? "#ffff66" // Low-Medium (yellow)
                                : emissions > 1_000_000
                                ? "#90ee90" // Low (light green)
                                : emissions > 0
                                ? "#add8e6" // Very Low (light blue)
                                : "#e0e0e0"; // No data

                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                data-tooltip-id="map-tooltip"
                                data-tooltip-content={`${geo.properties.name}: ${emissions.toLocaleString()} tonnes`}
                                onMouseEnter={() => {}}
                                onMouseLeave={() => {}}
                                onClick={() => {
                                    navigate(`/country/${countryCode}`);
                                  }}
                                // onMouseEnter={() => {
                                //     setTooltipContent(`${geo.properties.name}: ${emissions.toLocaleString()} tonnes`);
                                // }}
                                // onMouseLeave={() => {
                                //     setTooltipContent("");
                                // }}
                                style={{
                                    default: { fill: fillColor, outline: "none" },
                                    hover: { fill: "#A9A9A9", outline: "none" }, // Dark gray on hover
                                    pressed: { outline: "none" },
                                }}
                            />
                        );
                    })
                }
            </Geographies>
        </ComposableMap>

        <Tooltip id="map-tooltip" />
    </div>
);
};

export default CO2Map;
