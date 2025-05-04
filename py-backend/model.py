"""
Load trained model and encoder, expose a predict function
"""

import joblib
import numpy as np

# paths to saved artifacts
MODEL_PATH = "model.joblib"
ENCODER_PATH = "encoder.joblib"

# load artifacts once
model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)

# create reverse mapping for outputs
idx_to_route = {idx: route for idx, route in enumerate(encoder.classes_)}
# print(idx_to_route)

def predict_next_route(previous_routes: list[str]) -> str:
    """
    Given a list of the last N-1 routes, predict the next route.
    previous_routes: e.g. ['/home', '/about']
    Returns predicted route string.
    """
    # Transform to indices
    seq = encoder.transform(previous_routes)

    # Model expects 2D array, so reshape
    seq = np.array(seq).reshape(1, -1)  # Fix: Reshape to 2D array
    pred_idx = model.predict([seq][0])
    
    # Extract scalar value from numpy array
    pred_idx = pred_idx[0]  # Fix: Extract the first element
    # print(f"Predicted index: {pred_idx}")

    # Map back to route string
    print(f"Predicted route: {idx_to_route[pred_idx]}")
    return idx_to_route[pred_idx]

predict_next_route(["/", "/about"])