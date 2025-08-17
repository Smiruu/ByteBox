import React, { useState } from "react";
import { model } from "../config/firebase";

function TestingScreen() {
  const [foodInput, setFoodInput] = useState("");
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    const prompt = `
    Analyze the given food: ${foodInput}. 
    Provide the following details in JSON format only:
    {
      "food_item": "",
      "serving_size": "",
      "weight_grams": 0,
      "nutrients": {
        "calories": 0,
        "carbohydrates": 0,
        "protein": 0,
        "fat": 0
      }
    }
    `;

    try {
      setLoading(true);
      setFoodData(null);

      const response = await model.generateContent(prompt);
      const textResponse = response.response.text();
      console.log("Raw response:", textResponse);

      let cleanText = textResponse.trim();
      cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

      try {
        const parsed = JSON.parse(cleanText);
        setFoodData(parsed);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }
    } catch (error) {
      console.error("Error analyzing food:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🍴 Food Nutrient Scanner
      </h1>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter food name (e.g., Adobo)"
        value={foodInput}
        onChange={(e) => setFoodInput(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {loading && (
        <p className="mt-4 text-center text-gray-600 animate-pulse">
          🔍 Analyzing food data, please wait...
        </p>
      )}

      {foodData && !loading && (
        <div className="mt-6 p-4 bg-black-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">🍽 Food Information</h2>
          <p><strong>Name:</strong> {foodData.food_item}</p>
          <p><strong>Serving Size:</strong> {foodData.serving_size}</p>
          <p><strong>Weight:</strong> {foodData.weight_grams} g</p>

          <h2 className="text-xl font-semibold mt-4 mb-2">⚡ Nutrients</h2>
          <p><strong>Calories:</strong> {foodData.nutrients.calories} kcal</p>
          <p><strong>Carbohydrates:</strong> {foodData.nutrients.carbohydrates} g</p>
          <p><strong>Protein:</strong> {foodData.nutrients.protein} g</p>
          <p><strong>Fat:</strong> {foodData.nutrients.fat} g</p>
        </div>
      )}
    </div>
  );
}

export default TestingScreen;
