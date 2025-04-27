// src/components/CountryPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer,
} from "recharts";

const CountryPage = () => {
  const { countryCode } = useParams(); // Get country code from URL
  const navigate = useNavigate();      // To go back to the map

  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch("/annual-co-emissions-by-region.csv"); // CSV file path
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });

        setAllData(parsed.data);
        //console.log("Parsed Co2 CSV:", parsed.data);
      } catch (error) {
        console.error("Failed to load or parse CSV:", error);
      }
    };

    fetchCSVData();
  }, []);

  useEffect(() => {
    //console.log("Country Code:", countryCode);
    //console.log("All Data:", allData.length);
    if (allData.length === 0) return;

    // Find the Entity name for the countryCode
    const countryRows = allData.filter(row => row.Entity?.trim().toUpperCase() === countryCode.trim().toUpperCase());

    if (countryRows.length > 0) {
      setCountryName(countryRows[0].Entity);
      console.log("Country Name:", countryRows[0].Entity);

      const formatted = countryRows.map(row => ({
        year: row.Year,
        emissions: parseFloat(row["Annual CO2 emissions"]) || 0,
      }));

      setChartData(formatted);
    } else {
      setCountryName("Unknown Country");
    }
  }, [countryCode, allData]);

  if (chartData.length === 0) {
    return <div className="text-center mt-10">Loading chart...</div>;
  }

  return (
    <div className="p-6" style = {{ padding: "10px" }}>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate("/co2-map")}
      >
        ← Back to Map
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        {countryName} - CO₂ Emissions Over Time
      </h2>

      {/* <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: "CO₂ Emissions (tonnes)", angle: -90, position: "insideLeft" }} />
          <RechartTooltip />
          <Line type="monotone" dataKey="emissions" stroke="#2ecc71" name="CO₂ Emissions" />
        </LineChart>
      </ResponsiveContainer> */}
     <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="year"
            tick={{ fontSize: 12 }}
            interval={Math.floor(chartData.length / 10)} // Show fewer x-axis labels
            />
            <YAxis
            label={{
                value: "CO₂ Emissions (tonnes)",
                angle: -90,
                position: "outsideLeft",
                fontSize: 14,
                dy : -10,
            }}
            tick={false}
            />
            <RechartTooltip />
            <Line
            type="monotone"    // smoother curve instead of sharp lines
            dataKey="emissions"
            stroke="#2ecc71"
            strokeWidth={3}
            dot={{ r: 1.5 }}   // smaller dots
            activeDot={{ r: 5 }} // slightly larger when you hover
            />
        </LineChart>
        </ResponsiveContainer>

    </div>
  );
};

export default CountryPage;
