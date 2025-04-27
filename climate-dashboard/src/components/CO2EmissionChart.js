// src/components/CO2EmissionsChart.js
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const CO2EmissionsChart = () => {
  const [allData, setAllData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("United States of America"); // Default
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch("/annual-co-emissions-by-region.csv"); // adjust path if needed
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });

        console.log("Parsed Co2 CSV:", parsed.data);
        setAllData(parsed.data);
      } catch (error) {
        console.error("Failed to load or parse CSV:", error);
      }
    };

    fetchCSVData();
  }, []);

  useEffect(() => {
    if (allData.length === 0) return;

    const filtered = allData
      .filter(row => row.Entity === selectedCountry)
      .map(row => ({
        year: row.Year,
        emissions: parseFloat(row["Annual CO2 emissions"]) || 0,
      }));

    setChartData(filtered);
  }, [selectedCountry, allData]);

  // Build country list for dropdown
  const countries = [...new Set(allData.map(row => row.Entity))].sort();
  console.log("Countries:", countries);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">CO₂ Emissions Over Time</h2>

      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: "CO₂ Emissions (tonnes)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="emissions" stroke="#2ecc71" name="CO₂ Emissions" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CO2EmissionsChart;
