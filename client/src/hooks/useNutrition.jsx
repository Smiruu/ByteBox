import { useState, useEffect } from "react";

export function useNutrition() {
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    // ✅ Dummy data for now (replace with API call later)
    const dummyData = {
      carbohydrates: 45, // grams
      fats: 12,          // grams
      protein: 20,       // grams
      sugars: 15,        // grams
      sodium: 500        // mg
    };

    // Simulate network delay
    setTimeout(() => {
      setNutrition(dummyData);
    }, 500);
  }, []);

  return nutrition;
}
