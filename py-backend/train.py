"""
Training a logistic regression model on route log data stored in MongoDB.
Generates model.joblib and encoder.joblib files.
"""
from dotenv import load_dotenv
import os 
import joblib
import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

import pymongo

# Load environment variables from .env file
load_dotenv()

# configuration
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "intel-route-db"
COLLECTION_NAME = "visits"
MODEL_PATH = "model.joblib"
ENCODER_PATH = "encoder.joblib"
N_GRAM = 3

#1. Connect to MongoDB and fetch sorted logs
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

#2. Group routes by sessionId
def fetch_data():
    sessions = {}
    for doc in collection.find().sort("timestamp", pymongo.ASCENDING):
        sid = doc["sessionId"]
        route = doc["route"]
        sessions.setdefault(sid, []).append(route)
    print(f"Number of sessions: {len(sessions)}")
    # print(sessions)
    return sessions


#3. Build n-gram samples
def generate_ngrams(sessions):
    x,y = [], []
    for route in sessions.values():
        if len(route) >= N_GRAM:
            for i in range(len(route) - N_GRAM + 1):
                x.append(route[i:i+N_GRAM-1])
                y.append(route[i+N_GRAM-1])
    # print(x)
    # print(y)
    return x, y

generate_ngrams(fetch_data())


def train():
    sessions = fetch_data()
    x_raw, y_raw = generate_ngrams(sessions)
    if not x_raw:
        print("Not enough data to train the model.")
        return
    #4. Tokenize the routes
    all_routes = list({r for seq in x_raw for r in seq} | set(y_raw))
    # print(all_routes)
    encoder = LabelEncoder()
    encoder.fit(all_routes)
    x_encoded = [encoder.transform(seq).tolist() for seq in x_raw]
    y_encoded = encoder.transform(y_raw)
    #5. Train-test split
    x_train, x_test, y_train, y_test = train_test_split(
        x_encoded, y_encoded, test_size=0.2, random_state=42
    )
    #6. Train the model
    model = LogisticRegression(max_iter=200)
    model.fit(x_train, y_train)
    acc = model.score(x_test, y_test)
    print(f"Model accuracy: {acc:.2%}")
    #7. Save artifcats
    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoder, ENCODER_PATH)
    print(f"Model and encoder saved to {MODEL_PATH} and {ENCODER_PATH}.")

if __name__ == "__main__":
    train()