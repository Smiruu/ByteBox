import React, { useState } from "react";
import { Clock } from "lucide-react";

import RecipeCards from "../components/dashboard/RecipeCards.jsx";
import SensorGrid from "../components/dashboard/SensorGrid.jsx";
import NutritionFacts from "../components/dashboard/NutritionFacts.jsx";

export default function Dashboard() {
  const [foodInput, setFoodInput] = useState("");
  const [foodName, setFoodName] = useState("");

  const handleAnalyze = () => {
    if (!foodInput.trim()) return;
    setFoodName(foodInput.trim());
  };

  return (
    <div className="min-h-screen grid grid-cols-6">
      <div className="col-span-6">
        {/* Header */}
        <div className="grid grid-cols-2">
          <div>
            <p className="text-3xl font-bold ml-6 mt-6">Dashboard</p>
            <p className="text-sm ml-6 text-gray-400">
              Real-time gas monitoring overview
            </p>
          </div>
          <div className="hidden md:flex justify-end items-center mr-6 mt-6 text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            Last updated: 10:47:46 PM
          </div>
        </div>

        {/* Food Analyzer Input */}
        <div className="m-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter food name (e.g., Adobo)"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3 text-black"
          />
          <button
            onClick={handleAnalyze}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Analyze
          </button>
        </div>

        {/* Main Content */}
        <div className="m-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recipe Cards */}
          <div className="col-span-2">
            {foodName && <RecipeCards foodName={foodName} />}
          </div>

          {/* Nutrition Facts */}
          <div className="flex justify-center">
            {foodName && (
              <div className="sticky top-6 w-full max-w-sm">
                <NutritionFacts foodName={foodName} />
              </div>
            )}
          </div>
        </div>

        {/* Sensors */}
        <div className="m-6">
          <SensorGrid />
        </div>
      </div>
    </div>
  );
}
