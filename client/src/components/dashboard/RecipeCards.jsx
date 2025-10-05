import React, { useEffect, useState } from "react";
import useFoodAnalyzer from "../../hooks/useFoodAnalyzer";
import { Clock, Users, X } from "lucide-react";

const RecipeCards = ({ foodName }) => {
  const { analyzeFood, foodData, loading, error } = useFoodAnalyzer();
  const [selectedRecipe, setSelectedRecipe] = useState(null); // for modal

  useEffect(() => {
    if (foodName) analyzeFood(foodName);
  }, [foodName]);

  if (loading)
    return (
      <p className="text-gray-500 italic text-center animate-pulse mt-4">
        🔍 Loading recipe suggestions...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 italic text-center mt-4">⚠️ {error}</p>
    );
  if (!foodData || foodData.is_final_product || !Array.isArray(foodData.recipes))
    return null;

  const RecipeCard = ({
    title,
    description,
    time,
    servings,
    difficulty,
    whyNow,
    ingredients = [],
    onViewRecipe,
  }) => (
    <div className="max-w-md rounded-2xl overflow-hidden shadow-lg bg-white border">
      <div className="p-4 space-y-3">
        <div>
          <h2 className="font-bold text-lg text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <div className="flex items-center gap-1">
            <Clock size={16} /> {time}
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} /> {servings}
          </div>
          <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
            {difficulty}
          </span>
        </div>

        {whyNow && (
          <div className="bg-gray-100 text-gray-700 text-sm px-3 py-2 rounded-md">
            <span className="font-semibold">Tip:</span> {whyNow}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-sm text-gray-800">Ingredients:</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            {ingredients.slice(0, 3).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
            {ingredients.length > 3 && (
              <li className="text-blue-600 cursor-pointer">
                + {ingredients.length - 3} more
              </li>
            )}
          </ul>
        </div>

        <button
          onClick={onViewRecipe}
          className="w-full bg-gray-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition"
        >
          View Recipe
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {foodData.recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.recipe_name || recipe.name || `Recipe ${index + 1}`}
            description={recipe.description || "No description provided."}
            time={recipe.prep_time || "Approx. 30 mins"}
            servings={recipe.servings || "1–2 servings"}
            difficulty={recipe.difficulty || "Medium"}
            whyNow={recipe.tip || ""}
            ingredients={Array.isArray(recipe.ingredients) ? recipe.ingredients : ["Ingredients not listed"]}
            onViewRecipe={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {/* Modal for full recipe */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-xl w-full relative p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              {selectedRecipe.recipe_name || selectedRecipe.name}
            </h2>
            <p className="text-gray-700 mb-2">{selectedRecipe.description}</p>
            <p className="mb-2">
              <strong>Prep Time:</strong> {selectedRecipe.prep_time || "N/A"} |{" "}
              <strong>Servings:</strong> {selectedRecipe.servings || "N/A"} |{" "}
              <strong>Difficulty:</strong> {selectedRecipe.difficulty || "N/A"}
            </p>
            {selectedRecipe.tip && (
              <p className="italic text-gray-600 mb-2">💡 Tip: {selectedRecipe.tip}</p>
            )}
            <h3 className="font-semibold text-gray-800 mb-1">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {Array.isArray(selectedRecipe.ingredients)
                ? selectedRecipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)
                : ["Ingredients not listed"]}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCards;
