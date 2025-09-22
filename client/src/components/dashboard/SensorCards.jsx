import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function SensorCard({
  name,
  formula,
  value,
  unit,
  status,
  safeLevel,
  warningLevel,
  icon,
  history = [], 
}) {
  const statusColors = {
    Safe: "bg-green-100 text-green-700",
    Warning: "bg-yellow-100 text-yellow-700",
    Critical: "bg-red-100 text-red-700",
  };

  const lineColors = {
    Safe: "#22c55e", 
    Warning: "#eab308", 
    Critical: "#ef4444",
  };

  return (
    <div className="p-4 rounded-xl shadow bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <h3 className="text-sm font-semibold">
            {name} <span className="text-gray-500">({formula})</span>
          </h3>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      <p className="text-2xl font-bold">
        {value}
        <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
      </p>

      <div className="h-16 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColors[status]}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Safe Level{" "}
          <span className="text-black">
            {safeLevel} {unit}
          </span>
        </span>
        <span>
          Warning Level{" "}
          <span className="text-black">
            {warningLevel} {unit}
          </span>
        </span>
      </div>
    </div>
  );
}
