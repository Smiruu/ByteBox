import { CheckCircle, AlertTriangle, Activity } from "lucide-react";

export default function StatusCard({ title, value, description, type }) {
  let color, icon;

  switch (type) {
    case "safe":
      color = "text-green-600";
      icon = <CheckCircle className="text-green-500" />;
      break;
    case "warning":
      color = "text-yellow-600";
      icon = <AlertTriangle className="text-yellow-500" />;
      break;
    case "critical":
      color = "text-red-600";
      icon = <Activity className="text-red-500" />;
      break;
    default:
      color = "text-gray-600";
      icon = null;
  }

  return (
    <div className="p-4 rounded-xl shadow bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">{title}</h3>
        {icon}
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}
