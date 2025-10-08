import React, { useEffect, useState } from "react";

export default function PredictionDisplay({ foodName, data }) {
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    if (foodName && data) {
      setPredictions({
        average: data.average_prediction,
        rf: data.rf_prediction,
        weighted: data.weighted_prediction,
        xgb: data.xgb_prediction,
      });
    }
  }, [foodName, data]);

  if (!foodName || !predictions) return null;

  return (
    <div className="p-4 border rounded bg-gray-50 text-black w-full max-w-sm">
      <h3 className="text-lg font-bold mb-2">Predictions for {foodName}</h3>
      <p>Average Prediction: {predictions.average}</p>
      <p>RF Prediction: {predictions.rf}</p>
      <p>Weighted Prediction: {predictions.weighted}</p>
      <p>XGB Prediction: {predictions.xgb}</p>
    </div>
  );
}
