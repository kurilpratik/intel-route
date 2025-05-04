"use client";

import React from "react";
import retrainModel from "../utils/retrainModel";

const RetrainButton = () => {
  return (
    <button
      className="bg-blue-500 text-white w-[80%] py-2 rounded hover:bg-blue-600 transition duration-200"
      onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
      onMouseOut={(e) => (e.currentTarget.style.cursor = "default")}
      onClick={() => retrainModel().then(() => alert("Started retraining"))}
    >
      Retrain Model
    </button>
  );
};

export default RetrainButton;
