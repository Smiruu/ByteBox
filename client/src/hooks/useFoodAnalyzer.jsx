import { useState } from "react";
import { model } from "../config/firebase";

export default function useFoodAnalyzer() {
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeFood = async (foodInput) => {
    const trimmedInput = foodInput.trim().toLowerCase();
    if (!trimmedInput) return;

    // 1️⃣ Check localStorage first
    const cached = localStorage.getItem(trimmedInput);
    if (cached) {
      setFoodData(JSON.parse(cached));
      return JSON.parse(cached);
    }

    const prompt = `
Analyze the given food: ${foodInput}. 
Provide the following details in JSON format only:
{
  "food_item": "",
  "nutrients": {
    "calories": 0,
    "carbohydrates": 0,
    "protein": 0,
    "fat": 0
  },
  "is_final_product": false,
  "recipes": []
}

Rules:
1. Always suggest at least 4 Filipino household-style recipes that can reuse or transform the given food.
2. Include all relevant nutrients if available, such as fiber, sugar, sodium, potassium, vitamins, and minerals. If a nutrient is not known, set its value to 0.
3. Recipes should have detailed info: description, prep time, servings, difficulty, tip, and list of ingredients.
4. If no meaningful recipes can be made (because it is already a final dish), set "is_final_product": true and leave "recipes": [].
`;

    try {
      setLoading(true);
      setError(null);
      setFoodData(null);

      const response = await model.generateContent(prompt);

      let textResponse;
      if (response.response && typeof response.response.text === "function") {
        textResponse = await response.response.text();
      } else if (typeof response.text === "function") {
        textResponse = await response.text();
      } else {
        throw new Error("Cannot extract text from response");
      }

      const cleanText = textResponse.trim().replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanText);

      // Make nutrients fully dynamic
      const defaultNutrients = { calories: 0, carbohydrates: 0, protein: 0, fat: 0 };
      const newNutrients = {};
      if (parsed.nutrients && typeof parsed.nutrients === "object") {
        for (const [key, value] of Object.entries(parsed.nutrients)) {
          newNutrients[key] = typeof value === "number" ? value : 0;
        }
      }
      for (const [key, value] of Object.entries(defaultNutrients)) {
        if (!(key in newNutrients)) newNutrients[key] = value;
      }
      parsed.nutrients = newNutrients;

      // Ensure recipes are only present if food is not final
      if (parsed.is_final_product) {
        parsed.recipes = [];
      } else if (Array.isArray(parsed.recipes)) {
        // Fill missing info for each recipe
        parsed.recipes = parsed.recipes.map((r, i) => ({
          recipe_name: r.recipe_name || r.name || `Recipe ${i + 1}`,
          description: r.description || "No description provided.",
          prep_time: r.prep_time || "Approx. 30 mins",
          servings: r.servings || "1–2 servings",
          difficulty: r.difficulty || "Medium",
          tip: r.tip || "",
          ingredients: Array.isArray(r.ingredients) ? r.ingredients : ["Ingredients not listed"],
        }));
      }

      // 2️⃣ Store result in localStorage
      localStorage.setItem(trimmedInput, JSON.stringify(parsed));

      setFoodData(parsed);
      return parsed;
    } catch (err) {
      console.error("Error analyzing food:", err);
      setError("Failed to analyze food. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { analyzeFood, foodData, loading, error };
}
