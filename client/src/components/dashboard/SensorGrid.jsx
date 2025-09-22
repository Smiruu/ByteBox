import { useSensors } from "../../hooks/useSensors.jsx";
import SensorCard from "./SensorCards.jsx";

export default function SensorsGrid() {
  const { sensors, loading, error } = useSensors();

  if (loading) return <p>Loading sensors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="gap-4 grid lg:grid-cols-2 sm:grid-cols-1">
      {sensors.map((sensor) => (
        <SensorCard key={sensor.id} {...sensor} />
      ))}
    </div>
  );
}
