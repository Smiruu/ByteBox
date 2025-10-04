import React from "react";
import { Home, Utensils, BarChart, Clock, Bell, Settings } from "lucide-react";

function Navbar() {
  return (
    <>
      <div>
        <p className="text-md font-bold hidden md:block mt-4 ml-4">
          Food Spoilage Predictor
        </p>
        <p className="text-sm text-gray-400 hidden md:block ml-4">
          Smart monitoring system
        </p>
      </div>
      <div>
        {/* Nav links */}
        <nav className="flex-1 px-2 space-y-2 mt-8">
          <a
            href="#"
            className="flex items-center md:justify-start justify-center gap-3 px-3 py-2 rounded-lg bg-black text-white font-medium"
          >
            <Home size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center md:justify-start justify-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Utensils size={18} />
            <span className="hidden md:inline">Recipe Suggestions</span>
          </a>

          <a
            href="#"
            className="flex items-center md:justify-start justify-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <BarChart size={18} />
            <span className="hidden md:inline">Analytics</span>
          </a>

          <a
            href="#"
            className="flex items-center md:justify-start justify-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Clock size={18} />
            <span className="hidden md:inline">History</span>
          </a>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
