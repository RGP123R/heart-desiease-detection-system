import joblib
import pandas as pd

# === Load your trained model ===
model = joblib.load("models/heart_xgb_pipeline.joblib")

# === Define patient details ===
patient_data = {
    "age": 50,
    "sex": 1,                     # Male
    "cp": 1,                      # Atypical Angina
    "trestbps": 120,              # Resting BP
    "chol": 200,                  # Cholesterol
    "fbs": 0,                     # Fasting Blood Sugar > 120 mg/dl (No)
    "restecg": 0,                 # Normal
    "thalach": 100,               # Max Heart Rate
    "exang": 0,                   # Exercise Angina (No)
    "oldpeak": 0.0,               # ST Depression
    "slope": 1,                   # Flat
    "ca": 0,                      # Major Vessels
    "thal": 0                     # Normal Thalassemia
}

# === Convert to DataFrame ===
df = pd.DataFrame([patient_data])

# === Make prediction ===
prediction = int(model.predict(df)[0])
probability = float(model.predict_proba(df)[0][1])  # Probability of heart disease

# === Define risk levels ===
if probability < 0.4:
    risk = "Low"
elif probability < 0.7:
    risk = "Medium"
else:
    risk = "High"

diagnosis = "Heart Disease Detected" if prediction == 1 else "No Heart Disease Detected"

# === Print result ===
print("🩺 Heart Disease Prediction Result")
print("---------------------------------")
print(f"Diagnosis   : {diagnosis}")
print(f"Probability : {probability:.2f}")
print(f"Risk Level  : {risk}")
print("---------------------------------")
