import React from "react";
import { Clock } from "lucide-react";

import RecipeCard from "../components/dashboard/RecipeCards.jsx";
import SensorGrid from "../components/dashboard/SensorGrid.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import NutritionFacts from "../components/dashboard/NutritionFacts.jsx";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen grid grid-cols-6">
        <div className="col-span-6">
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
          <div className="m-6 grid grid-cols-2 gap-6">
            <div className="m-6 grid grid-cols-2 gap-6 justify-center">
              <RecipeCard
                priority="Medium Priority"
                title="Fresh Garden Salad"
                description="Use leafy greens and vegetables at peak freshness"
                time="10 mins"
                servings="4 servings"
                difficulty="Easy"
                whyNow="Best to consume vegetables soon"
                ingredients={[
                  "Mixed greens",
                  "Tomatoes",
                  "Cucumbers",
                  "Carrots",
                  "Olives",
                ]}
                onViewRecipe={() => alert("Viewing recipe!")}
              />
              <RecipeCard
                priority="Medium Priority"
                title="Fresh Garden Salad"
                description="Use leafy greens and vegetables at peak freshness"
                time="10 mins"
                servings="4 servings"
                difficulty="Easy"
                whyNow="Best to consume vegetables soon"
                ingredients={[
                  "Mixed greens",
                  "Tomatoes",
                  "Cucumbers",
                  "Carrots",
                  "Olives",
                ]}
                onViewRecipe={() => alert("Viewing recipe!")}
              />
            </div>
            <div className="m-6 flex justify-center">
              <NutritionFacts />
            </div>
          </div>

          <div className="m-6">
            <SensorGrid />
          </div>
        </div>
      </div>
    </>
  );
}
