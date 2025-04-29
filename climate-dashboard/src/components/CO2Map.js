// src/components/CO2Map.js
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Papa from "papaparse";
import {Tooltip} from "react-tooltip";
import { useNavigate } from "react-router-dom";

// TopoJSON file for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CO2Map = () => {
  const [emissionsData, setEmissionsData] = useState({});
  // const [tooltipContent, setTooltipContent] = useState("");
  const [selectedYear, setSelectedYear] = useState("2019"); // Default year
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

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
  
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setSelectedYear(prevYear => {
          if (prevYear >= 2019) {
            setIsPlaying(false); // Stop playing if we reach the end
            return 2019;
          }
          return prevYear + 1;
        });
      }, 500); // change year every 500ms (0.5 seconds)
  
      return () => clearInterval(interval); // Clean up the interval on stop
    }
  }, [isPlaying]);
  

return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "10px" }}>
            <h2>
                World CO₂ Emissions Map ({selectedYear})
            </h2>

            <div style={{ position: "absolute", top: "100px", left: "20px", zIndex: 10 }}>
            <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-3 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                    style = {{ marginBottom: "10px", cursor: "pointer" , fontSize: "20px", padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
                >
                    {isPlaying ? (
                    <>
                        ⏸️ <span>Pause</span>
                    </>
                    ) : (
                    <>
                        ▶️ <span>Play</span>
                    </>
                    )}
                </button>
                </div>
            
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

        <div style={{ position: "absolute", top: "60px", right: "10px", display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#8b0000", marginRight: "10px" }}></div>
                <span>Very High (&gt; 5B tonnes)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#ff3c3c", marginRight: "10px" }}></div>
                <span>High (&gt; 1B tonnes)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#ffa500", marginRight: "10px" }}></div>
                <span>Medium (&gt; 100M tonnes)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#ffff66", marginRight: "10px" }}></div>
                <span>Low-Medium (&gt; 10M tonnes)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#90ee90", marginRight: "10px" }}></div>
                <span>Low (&gt; 1M tonnes)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#add8e6", marginRight: "10px" }}></div>
                <span>Very Low (&lt; 1M tonnes)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#e0e0e0", marginRight: "10px" }}></div>
                <span>No Data</span>
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
