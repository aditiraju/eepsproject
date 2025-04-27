// src/components/TemperatureChart.js
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const TemperatureChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch("/public/Environment_Temperature_change_E_All_Data_NOFLAG.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });

        console.log("Parsed CSV:", parsed.data);

        // Filter: Only one country (United States) and only Temperature change
        const filtered = parsed.data.filter(
          row => row.Months === "January" && row.Element === "Temperature change" && row.Code === "231" // "840" is USA in ISO country codes
        );

        if (filtered.length === 0) {
          console.error("No data found for United States in January!");
          return;
        }

        const entry = filtered[0];

        // Now map it to year/value pairs
        const formatted = Object.keys(entry)
          .filter(key => key.startsWith("Y"))
          .map(key => ({
            year: key.replace("Y", ""),
            tempChange: parseFloat(entry[key]) || 0,
          }));

        console.log("Formatted Data:", formatted);
        setData(formatted);
      } catch (error) {
        console.error("Failed to load or parse CSV:", error);
      }
    };

    fetchCSVData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">US Temperature Change (January, °C)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: "°C Change", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="tempChange" stroke="#e74c3c" name="Temp Change" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;


