import React, { useEffect, useState } from "react";

export default function PredictionDisplay({ foodName, data }) {
  const [weightedPrediction, setWeightedPrediction] = useState(null);

  useEffect(() => {
    if (foodName && data?.weighted_prediction !== undefined) {
      setWeightedPrediction(Math.round(data.weighted_prediction));
    }
  }, [foodName, data]);

  if (!foodName || weightedPrediction === null) return null;

  return (
    <div className="p-4 border rounded bg-gray-50 text-black w-full max-w-sm">
      <h3 className="text-lg font-bold mb-2">Prediction for {foodName}</h3>
      <p>Predicted Spoilage Time: {weightedPrediction} hours</p>
    </div>
  );
}
