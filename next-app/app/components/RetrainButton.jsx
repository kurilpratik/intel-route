"use client";

import React from "react";
import retrainModel from "../utils/retrainModel";

const RetrainButton = () => {
  return (
    <button
      onClick={() => retrainModel().then(() => alert("Started retraining"))}
    >
      Retrain Model
    </button>
  );
};

export default RetrainButton;
