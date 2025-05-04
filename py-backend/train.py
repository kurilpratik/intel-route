"""
Training a logistic regression model on route log data stored in MongoDB.
Generates model.joblib and encoder.joblib files.
"""

import joblib
import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

import pymongo

# configuration
MONGO_URI = "mongodb+srv://pratikkurilworks:6Opv5ggRPgUC6c6K@cluster0.kf6mgoe.mongodb.net/"
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
session_data = {}
for entry in collection.find().sort("timestamp", pymongo.ASCENDING):
    sid = entry["sessionId"]
    session_data.setdefault(sid, []).append(entry["route"])

print(f"Number of sessions: {len(session_data)}")
# print(session_data)

#3. Build n-gram samples
x_raw, y_raw = [], []
for routes in session_data.values():
    if len(routes) >= N_GRAM:
        for i in range(len(routes) - N_GRAM + 1):
            x_raw.append(routes[i:i+N_GRAM-1])
            y_raw.append(routes[i+N_GRAM-1])

# print(x_raw)
# print(y_raw)

#4. Tokenize the routes
all_routes = list({r for seq in x_raw for r in seq} | set(y_raw))
# print(all_routes)
encoder = LabelEncoder().fit(all_routes)
x_encoded = [encoder.transform(seq).tolist() for seq in x_raw]
y_encoded = encoder.transform(y_raw)

# print(x_encoded)
# print(y_encoded)

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