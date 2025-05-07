const retrainModel = async () => {
  try {
    const res = await fetch("http://localhost:8000/retrain", {
      method: "POST",
    });
    if (!res.ok) throw new Error("Retrain API failed");
    else {
      const data = await res.json();
      console.log("Retrain API response:", data);
      console.log("Model retrained successfully - retrainModel.js");
      return data;
    }
  } catch (error) {
    console.error("Error retraining model:", error);
    return null;
  }
};

export default retrainModel;
