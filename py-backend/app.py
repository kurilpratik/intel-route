"""
FastAPI server exposing a /predict endpoint.
Accepts JSON {routes: ["/home", "/about"]} and returns { predicted: "/contact" }.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from model import predict_next_route

# FastAPI app instance
app = FastAPI()

class PredictRequest(BaseModel):
    routes: list[str]

class PredictResponse(BaseModel):
    predicted: str

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    # Validate imput length matches model training (N-1)
    # N_gram - 1 = 3 - 1 = 2
    if len(req.routes) != 2:
        raise HTTPException(
            status_code=400,
            detail=f"routes list must have length 2, got {len(req.routes)}",
        )
    try:
        next_route = predict_next_route(req.routes)
        return PredictResponse(predicted=next_route)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0",port=8000)