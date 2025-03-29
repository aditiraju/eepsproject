import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const years = Array.from({ length: 23 }, (_, i) => 2000 + i);
const co2Levels = years.map((_, i) => 370 + i * 2); 
const tempAnomalies = years.map((_, i) => 0.5 + i * 0.02); 
const seaLevels = years.map((_, i) => i * 3); 

const createChartData = (label, data, color) => ({
  labels: years,
  datasets: [{ label, data, borderColor: color, backgroundColor: color, fill: false }]
});

const ClimateData = () => {
  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>📊 Climate Data Trends</h2>

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h3>🌱 CO₂ Levels</h3>
        <Line data={createChartData("CO₂ ppm", co2Levels, "green")} />
      </div>

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h3>🌡️ Temperature Anomalies</h3>
        <Line data={createChartData("Temperature (°C)", tempAnomalies, "red")} />
      </div>

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <h3>🌊 Sea Level Rise</h3>
        <Line data={createChartData("Sea Level (mm)", seaLevels, "blue")} />
      </div>
    </div>
  );
};

export default ClimateData;
