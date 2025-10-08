import os
import json
import joblib
import numpy as np
import firebase_admin
from firebase_admin import credentials, db
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

FIREBASE_CRED_JSON = os.getenv("FIREBASE_CRED_JSON")
FIREBASE_URL = os.getenv("FIREBASE_URL")
RASPI_PATH = os.getenv("RASPI_PATH", "raspi-data/")  # default if not provided

# --- Firebase setup ---
cred_dict = json.loads(FIREBASE_CRED_JSON)
cred = credentials.Certificate(cred_dict)
firebase_admin.initialize_app(cred, {
    "databaseURL": FIREBASE_URL
})

# --- Load Regression Models ---
xgb_model = joblib.load("models/xgb_spoilage_model.pkl")
rf_model = joblib.load("models/rf_spoilage_model.pkl")

# --- AI FUNCTIONS ---
def preprocess_data(data: dict):
    """Extract and order features for models"""
    features = [
        data.get("temp", 0),
        data.get("hum", 0),
        data.get("NH3_ppm", 0),       # "NH₃ ppm"
        data.get("CO2_ppm", 0),       # "CO₂ ppm"
        data.get("H2S_ppm", 0),       # "H2S ppm"
        data.get("Alcohol_mgL", 0),   # "Alcohol mg/L"
        data.get("CH4_ppm", 0) 
    ]
    return np.array(features).reshape(1, -1)


def predict_with_models(data: dict):
    """Run both regression models and return numeric predictions"""
    X = preprocess_data(data)

    xgb_pred = float(xgb_model.predict(X)[0])
    rf_pred = float(rf_model.predict(X)[0])

    # Weighted average ensemble: XGBoost gets 70%, RF 30%
    weighted_pred = round((0.7 * xgb_pred) + (0.3 * rf_pred), 4)

    return {
        "xgb_prediction": xgb_pred,
        "rf_prediction": rf_pred,
        "average_prediction": round((xgb_pred + rf_pred) / 2, 4),  # simple avg
        "weighted_prediction": weighted_pred
    }


# --- PROCESS LATEST ENTRY ---
def process_latest_entry():
    """Fetch and process only the latest raspi-data entry"""
    raspi_ref = db.reference(RASPI_PATH)
    snapshot = raspi_ref.order_by_key().limit_to_last(1).get()

    if snapshot:
        key = list(snapshot.keys())[0]
        latest_data = snapshot[key]

        print(f"📥 Latest entry ({key}):", latest_data)
        predictions = predict_with_models(latest_data)

        # Update existing node with predictions only
        result_ref = db.reference(f"{RASPI_PATH}{key}")
        result_ref.update(predictions)

        print(f"✅ Predictions added for {key}: {predictions}")
    else:
        print("⚠️ No data found in raspi-data.")




# --- STREAM HANDLER ---
def stream_handler(event):
    """Triggered when raspi-data updates"""
    if event.event_type in ["put", "patch"]:
        print("🔄 Detected update — fetching latest entry...")
        process_latest_entry()


def start_listener():
    ref = db.reference(RASPI_PATH)
    print("🔥 Listening for new sensor data...")
    ref.listen(stream_handler)


# --- MAIN ---
if __name__ == "__main__":
    print("🚀 AI Worker started — waiting for new data...")
    process_latest_entry()  # Run once at startup
    start_listener()
