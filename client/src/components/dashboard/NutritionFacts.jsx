import React from "react";
import { useNutrition } from "../../hooks/useNutrition.jsx";

const NutritionFacts = () => {
  const nutrition = useNutrition();

  if (!nutrition) {
    return (
      <p className="text-gray-500 italic text-center">
        Loading nutrition facts...
      </p>
    );
  }

  return (
    <div className="p-6 min-w-md mx-auto bg-white border-2 border-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold border-b-4 border-gray-800 pb-2 mb-4">
        Nutrition Facts
      </h2>
      <p className="text-sm text-gray-600 mb-4">Serving Size: 1 meal</p>

      {/* Nutrients list */}
      <ul className="space-y-2 text-gray-900">
        <li className="flex justify-between border-b border-gray-200 pb-1">
          <span>Carbohydrates</span>
          <span className="font-semibold">{nutrition.carbohydrates} g</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 pb-1">
          <span>Fats</span>
          <span className="font-semibold">{nutrition.fats} g</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 pb-1">
          <span>Protein</span>
          <span className="font-semibold">{nutrition.protein} g</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 pb-1">
          <span>Sugars</span>
          <span className="font-semibold">{nutrition.sugars} g</span>
        </li>
        <li className="flex justify-between">
          <span>Sodium</span>
          <span className="font-semibold">{nutrition.sodium} mg</span>
        </li>
      </ul>
    </div>
  );
};

export default NutritionFacts;
