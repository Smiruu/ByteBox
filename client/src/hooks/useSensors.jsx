import { useEffect, useState } from "react";

export function useSensors() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSensors() {
      try {
        setLoading(true);
        setError(null);

        // 🔹 Dummy data with line graph history
        const dummyData = [
          {
            id: 1,
            name: "Ammonia",
            formula: "NH₃",
            value: 18.7,
            unit: "ppm",
            status: "Safe",
            safeLevel: 25,
            warningLevel: 50,
            icon: "🌬️",
            history: [
              { time: "10:00", value: 15 },
              { time: "10:10", value: 16 },
              { time: "10:20", value: 18 },
              { time: "10:30", value: 18.7 },
              { time: "10:40", value: 19 },
              { time: "10:00", value: 15 },
              { time: "10:10", value: 16 },
              { time: "10:20", value: 18 },
              { time: "10:30", value: 18.7 },
              { time: "10:40", value: 19 },
            ],
          },
          {
            id: 2,
            name: "Carbonate",
            formula: "CO₃",
            value: 84,
            unit: "ppm",
            status: "Safe",
            safeLevel: 100,
            warningLevel: 250,
            icon: "☁️",
            history: [
              { time: "10:00", value: 80 },
              { time: "10:10", value: 82 },
              { time: "10:20", value: 83 },
              { time: "10:30", value: 84 },
              { time: "10:40", value: 84 },
              { time: "10:00", value: 80 },
              { time: "10:10", value: 82 },
              { time: "10:20", value: 83 },
              { time: "10:30", value: 84 },
              { time: "10:40", value: 84 },
            ],
          },
          {
            id: 3,
            name: "Hydrogen Sulfide",
            formula: "H₂S",
            value: 12.5,
            unit: "ppm",
            status: "Warning",
            safeLevel: 10,
            warningLevel: 20,
            icon: "⚡",
            history: [
              { time: "10:00", value: 8 },
              { time: "10:10", value: 9 },
              { time: "10:20", value: 11 },
              { time: "10:30", value: 12.5 },
              { time: "10:40", value: 13 },
              { time: "10:00", value: 8 },
              { time: "10:10", value: 9 },
              { time: "10:20", value: 11 },
              { time: "10:30", value: 12.5 },
              { time: "10:40", value: 13 },
            ],
          },
          {
            id: 4,
            name: "Methane",
            formula: "CH₄",
            value: 321.9,
            unit: "ppm",
            status: "Safe",
            safeLevel: 500,
            warningLevel: 1000,
            icon: "🔥",
            history: [
              { time: "10:00", value: 300 },
              { time: "10:10", value: 310 },
              { time: "10:20", value: 315 },
              { time: "10:30", value: 321.9 },
              { time: "10:40", value: 320 },
              { time: "10:00", value: 300 },
              { time: "10:10", value: 310 },
              { time: "10:20", value: 315 },
              { time: "10:30", value: 321.9 },
              { time: "10:40", value: 320 },
            ],
          },
        ];

        if (isMounted) {
          setSensors(dummyData);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load sensors");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSensors();

    return () => {
      isMounted = false;
    };
  }, []);

  return { sensors, loading, error };
}
