const predictNextRoute = async (routes) => {
  // Set CORS headers
  const domain = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  try {
    const res = await fetch(`${domain}predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ routes }),
    });
    if (!res.ok) throw new Error("Prediction API failed");
    const data = await res.json();
    if (data && data.predicted) {
      // We defined predicted in app.py
      return data.predicted;
    } else {
      throw new Error("Invalid response from prediction API");
    }
  } catch (error) {
    console.error("Error predicting next route:", error);
    return null;
  }
};

export default predictNextRoute;
