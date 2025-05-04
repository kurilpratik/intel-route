###

train.py:

Connects to MongoDB

Builds 3‑gram samples

Trains a multinomial Logistic Regression

Saves model.joblib & encoder.joblib

model.py:

Loads the saved model & encoder

Exposes predict_next_route() that maps a list of two routes → next route

app.py:

FastAPI server with a POST /predict endpoint

Validates input length (2 routes)

Returns JSON { predicted: "/contact" }

### Deployment

FastAPI Backend (ML Model) -> Elastic Beanstalk, easiest to deploy Python apps (auto-provision EC2, load balancer, etc.)
