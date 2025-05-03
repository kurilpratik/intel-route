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

#1 Connect to MongoDB and fetch sorted logs
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

#2 Group routes by sessionId
session_data = {}
for entry in collection.find().sort("timestamp", pymongo.ASCENDING):
    sid = entry["sessionId"]
    session_data.setdefault(sid, []).append(entry["route"])

print(f"Number of sessions: {len(session_data)}")
print(session_data)