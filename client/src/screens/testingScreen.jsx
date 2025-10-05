import React, { useState } from "react";
import NutritionFacts from "../components/dashboard/NutritionFacts";
import RecipeCards from "../components/dashboard/RecipeCards"; // <-- use the self-contained RecipeCards

function TestingScreen() {
  const [foodInput, setFoodInput] = useState("");
  const [foodName, setFoodName] = useState("");

  const handleAnalyze = () => {
    if (!foodInput.trim()) return;
    setFoodName(foodInput.trim());
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 space-y-6">
      {/* Input Card */}
      <div className="w-full max-w-lg rounded-xl shadow-lg p-6 bg-black text-white border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🍴 Food Nutrient Scanner
        </h1>

        <input
          type="text"
          placeholder="Enter food name (e.g., Adobo)"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          className="border p-2 rounded w-full mb-4 text-black"
        />

        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Analyze
        </button>
      </div>

      {/* Nutrition Facts */}
      {foodName && <NutritionFacts foodName={foodName} />}

      {/* Recipe Suggestions */}
      {foodName && <RecipeCards foodName={foodName} />}
    </div>
  );
}

export default TestingScreen;
