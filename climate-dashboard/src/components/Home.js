// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ecfdf5", // Light green
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px"
    }}>
      <h1 style={{
        fontSize: "36px",
        fontWeight: "bold",
        color: "#047857", // Dark green
        marginBottom: "20px",
        textAlign: "center"
      }}>
        🌍 Welcome to the Climate Change Dashboard
      </h1>

      <p style={{
        fontSize: "18px",
        color: "#374151", // Gray-700
        marginBottom: "40px",
        textAlign: "center"
      }}>
        Explore climate data, solutions, and more!
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
      }}>
        {/* Map Card */}
        <div
          onClick={() => navigate("/co2-map")}
          style={{
            cursor: "pointer",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: "100%",
            maxWidth: "400px",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <img
            src="/Screenshot 2025-04-27 at 6.21.02 PM.png" // Replace with your image URL
            alt="World Map"
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover"
            }}
          />
          <div style={{
            padding: "20px",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#065f46", // Green
              marginBottom: "10px"
            }}>
              Explore CO₂ Emissions Map
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#4b5563" // Gray-600
            }}>
              Click to view emissions across the world from 1750 to 2019!
            </p>
          </div>
        </div>

        {/* Flood Card */}
        <div
          onClick={() => navigate("/flood-events")}
          style={{
            cursor: "pointer",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: "100%",
            maxWidth: "400px",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <img
            src="/Screenshot 2025-04-28 at 3.12.38 PM.png" // Replace with your image URL
            alt="World Map"
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover"
            }}
          />
          <div style={{
            padding: "20px",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#065f46", // Green
              marginBottom: "10px"
            }}>
              Explore Flood Events Map
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#4b5563" // Gray-600
            }}>
              Click to view the impact of flood events in the 21st century!
            </p>
          </div>
        </div>
        {/* Solutions Card */}
        <div
          onClick={() => navigate("/climate-solutions")}
          style={{
            cursor: "pointer",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: "100%",
            maxWidth: "400px",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <img
            src="/ca_climatechange_istock.webp" // Replace with your image URL
            alt="World Map"
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover"
            }}
          />
          <div style={{
            padding: "20px",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#065f46", // Green
              marginBottom: "10px"
            }}>
              Climate Change Solutions
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#4b5563" // Gray-600
            }}>
              Click to read how you can help stop abrupt climate change!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

