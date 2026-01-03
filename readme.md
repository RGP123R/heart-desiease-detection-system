# 🫀 Heart Disease Detection System

A full-stack machine learning web application that predicts the risk of heart disease based on standard clinical parameters. The system uses a calibrated XGBoost model served via a Flask REST API and a modern Next.js frontend.

---

## 📌 Project Overview

Heart disease is one of the leading causes of mortality worldwide. Early detection using clinical data can significantly improve patient outcomes.

This project provides a user-friendly web application where users enter medical parameters, which are processed by a trained machine learning model to return a probability-based heart disease risk assessment.

---

## 🏗️ System Architecture

- **Backend:** Flask-based REST API  
- **Frontend:** Next.js 16 (React) with TypeScript and Tailwind CSS  
- **Machine Learning Model:** Calibrated XGBoost Classifier  
- **Database:** SQLite (optional, for authentication)  
- **Deployment:** Backend on any Python server, frontend optimized for Vercel  

---

## 🔁 How the System Works

1. User inputs 13 medical parameters through the web form  
2. Data is sent to the Flask backend via REST API  
3. Input data is preprocessed (imputation and scaling)  
4. XGBoost model predicts heart disease probability  
5. Prediction probabilities are calibrated for better reliability  
6. API returns prediction, probability score, and risk level  

---

## 🧠 Machine Learning Details

- **Algorithm:** XGBoost Classifier  
- **Calibration:** Probability calibration applied  
- **Dataset:** UCI Heart Disease Dataset (303 samples)  
- **Number of Features:** 13  
- **Evaluation Metric:** ROC-AUC ≈ 0.85  
- **Preprocessing:**  
  - Median imputation for missing values  
  - StandardScaler for feature normalization  
- **Model Storage:** `joblib` pipeline  

**Model File Path**
```
heart-backend/models/heart_xgb_pipeline.joblib
```

---

## 📥 Input Features

| Feature | Description |
|-------|------------|
| age | Age in years |
| sex | Gender (0 = Female, 1 = Male) |
| cp | Chest pain type |
| trestbps | Resting blood pressure |
| chol | Serum cholesterol |
| fbs | Fasting blood sugar |
| restecg | Resting ECG results |
| thalach | Maximum heart rate achieved |
| exang | Exercise-induced angina |
| oldpeak | ST depression induced by exercise |
| slope | Slope of peak exercise ST segment |
| ca | Number of major vessels |
| thal | Thalassemia type |

---

## 📤 API Response Format

```json
{
  "prediction": 1,
  "probability": 0.82,
  "risk_level": "High"
}
```

### Prediction Meaning
- `1` → Heart Disease Detected  
- `0` → No Heart Disease  

### Risk Levels
- Low  
- Medium  
- High  

---

## ▶️ How to Run Locally

### Backend Setup

```bash
cd heart-backend
pip install -r requirements.txt
python app.py
```

Backend runs on `http://localhost:5000`

---

### Frontend Setup

```bash
cd heart-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 🚀 Deployment

- **Backend:** AWS / Render / Heroku  
- **Frontend:** Vercel  
- **CORS:** Secure cross-origin configuration  

---

## 📜 Disclaimer

Educational and research purposes only. Not for medical diagnosis.
