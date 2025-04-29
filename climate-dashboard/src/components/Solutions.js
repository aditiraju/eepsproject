// src/components/ClimateSolutionsPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ClimateSolutionsPage = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      title: "🌱 Plant Trees",
      description: "Trees absorb carbon dioxide and give us clean air. Planting trees helps fight climate change and makes our world greener!"
    },
    {
      title: "🚲 Walk, Bike, or Bus",
      description: "Cars release a lot of pollution. Walking, biking, or taking the bus helps reduce emissions — and it's fun and healthy too!"
    },
    {
      title: "💡 Save Energy",
      description: "Turn off lights when you leave a room. Unplug chargers when not in use. Every little action saves energy and protects the Earth."
    },
    {
      title: "🍏 Eat More Plants",
      description: "Fruits, veggies, and grains need less energy to grow than meat. Eating more plants can help the planet and keep you healthy!"
    },
    {
      title: "♻️ Recycle and Reuse",
      description: "Recycling old items into new ones uses less energy. Always try to reduce, reuse, and recycle!"
    },
    {
      title: "🗣️ Speak Up!",
      description: "Tell your friends, family, and teachers about climate change. One voice can inspire many others to help!"
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center px-4 py-6" style = {{ textAlign: 'center', padding: "10px" }}>
    

      <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-10 text-center">
        🌎 How YOU Can Help the Planet
      </h1>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl flex flex-col items-center text-center"
          >
            <h2 className="text-2xl font-bold mb-3">{solution.title}</h2>
            <p className="text-gray-600">{solution.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClimateSolutionsPage;

