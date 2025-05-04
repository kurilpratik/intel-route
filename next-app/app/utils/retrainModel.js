const retrainModel = async () => {
  try {
    const res = await fetch("http://localhost:8000/retrain", {
      method: "POST",
    });
    if (!res.ok) throw new Error("Retrain API failed");
    else {
      console.log("Model retrained successfully");
      return res.ok;
    }
  } catch (error) {
    console.error("Error retraining model:", error);
    return null;
  }
};

export default retrainModel;
