import React from "react";
import { Clock } from "lucide-react";

import StatusCard from "../components/dashboard/StatusCards.jsx";
import SensorGrid from "../components/dashboard/SensorGrid.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen grid grid-cols-6">
        <div className="col-span-1 border-r border-gray-200">
          <Navbar />
        </div>
        <div className="col-span-5">
          <div className="grid grid-cols-2">
            <div>
              <p className="text-3xl font-bold ml-6 mt-6">Dashboard</p>
              <p className="text-sm ml-6 text-gray-400">
                Real-time gas monitoring overview
              </p>
            </div>
            <div className="hidden md:flex justify-end items-center mr-6 mt-6 text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              Last updated: 10:47:46 PM
            </div>
          </div>
          <div className="m-6 grid gap-4 grid lg:grid-cols-4 sm:grid-cols-2">
            <StatusCard
              title="Overall Status"
              value="4"
              description="Total Sensors"
              type="warning"
            />
            <StatusCard
              title="Safe"
              value="3"
              description="Within safe limits"
              type="safe"
            />
            <StatusCard
              title="Warning"
              value="1"
              description="Above safe levels"
              type="warning"
            />
            <StatusCard
              title="Critical"
              value="0"
              description="Dangerous levels"
              type="critical"
            />
          </div>
          <div className="m-6">
            <SensorGrid />
          </div>
        </div>
      </div>
    </>
  );
}
