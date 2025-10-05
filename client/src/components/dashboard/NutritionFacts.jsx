import React, { useEffect } from "react";
import useFoodAnalyzer from "../../hooks/useFoodAnalyzer";

const NutritionFacts = ({ foodName }) => {
  const { analyzeFood, foodData, loading, error } = useFoodAnalyzer();

  useEffect(() => {
    if (foodName) analyzeFood(foodName);
  }, [foodName]);

  if (loading) return <p className="text-gray-500 italic text-center animate-pulse mt-4">🔍 Loading nutrition facts...</p>;
  if (error) return <p className="text-red-500 italic text-center mt-4">⚠️ {error}</p>;
  if (!foodData || !foodData.nutrients) return null;

  const formatNutrientName = (name) =>
    name.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  const getUnit = (key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === "calories") return "kcal";
    if (["protein", "fat", "fats", "carbohydrates", "carbs", "sugar", "sugars", "fiber"].includes(lowerKey)) return "g";
    return "mg";
  };

  return (
    <div className="p-6 min-w-md mx-auto bg-white border-2 border-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold border-b-4 border-gray-800 pb-2 mb-4 text-center">
        Nutrition Facts
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">Serving Size: 1 meal</p>

      <ul className="space-y-2 text-black">
        {Object.entries(foodData.nutrients)
          .filter(([_, value]) => value !== 0)
          .map(([key, value]) => (
            <li key={key} className="flex justify-between border-b border-gray-300 pb-1">
              <span>{formatNutrientName(key)}</span>
              <span className="font-semibold">{value} {getUnit(key)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NutritionFacts;
