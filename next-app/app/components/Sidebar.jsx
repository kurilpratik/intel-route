"use client";

import React, { useState } from "react";
import RetrainButton from "./RetrainButton";
import RouteTracker from "../utils/routeTracker";

const Sidebar = ({ className }) => {
  const [nextRoute, setNextRoute] = useState(null);
  const [pathName, setPathName] = useState("");

  return (
    <aside
      className={`${className} h-screen fixed right-0 top-0 bg-[var(--sidebar)] px-8 py-4`}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      <RouteTracker onNextRoute={setNextRoute} onPathNameChange={setPathName} />

      <h3 className="font-bold mb-12">🎲 Live Updates </h3>
      <h3 className="text-gray-600">
        Current Route: <br />
      </h3>
      <span className="font-bold">{pathName || "Loading"}</span>

      <h3 className="text-gray-600 mt-8">
        Next Predicted Route: <br />
      </h3>
      {!nextRoute && (
        <p className="text-blue-500 text-sm mt-2 w-[50%]">
          Need at least 2 route changes to predict next route, navigate to
          another page
        </p>
      )}
      <span className="font-bold">{nextRoute}</span>

      <div className="absolute bottom-4 w-[35%]">
        <p className="text-sm text-gray-500 mt-2 mb-4">
          Retrain the model again based on new data to get better and more
          precise results.
        </p>
        <RetrainButton />
      </div>
    </aside>
  );
};

export default Sidebar;
