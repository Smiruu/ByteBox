import { useState, useEffect } from "react";
import { db } from "../config/firebase"; // Realtime Database instance
import { ref, onValue, off, query, limitToLast } from "firebase/database";

export const usePrediction = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Query the last (most recent) entry under "raspi-data"
    const raspRef = query(ref(db, "raspi-data"), limitToLast(1));

    // Start listening for realtime updates
    onValue(
      raspRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const values = Object.values(rawData);
          const latest = values[0];
          setData(latest);
        } else {
          setData(null);
        }
      },
      (error) => {
        console.error("usePrediction error:", error);
      }
    );

    // Cleanup listener on unmount
    return () => {
      off(raspRef);
    };
  }, []);

  return data;
};
