import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { usePrediction } from "../hooks/usePrediction.jsx";
import RecipeCards from "../components/dashboard/RecipeCards.jsx";
import NutritionFacts from "../components/dashboard/NutritionFacts.jsx";
import PredictionDisplay from "../components/dashboard/PredictionDisplay.jsx";

export default function Dashboard() {
  const data = usePrediction(); // live sensor & predictions
  const [foodName, setFoodName] = useState(null);

  useEffect(() => {
    if (!foodName && data && data.food_name) {
      // Capture food_name only once
      const cleanedName = data.food_name
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setFoodName(cleanedName);
    }

    // Clear foodName if the data node is deleted
    if (foodName && !data) {
      setFoodName(null);
    }
  }, [data, foodName]);

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
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Main Content */}
        <div className="m-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            {foodName && <RecipeCards foodName={foodName} />}
          </div>

          <div className="flex flex-col items-center gap-6">
            {foodName && (
              <>
                <PredictionDisplay foodName={foodName} data={data} />
                <div className="sticky top-6 w-full max-w-sm">
                  <NutritionFacts foodName={foodName} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
