# 🫀 Heart Disease Detection System

A full-stack machine learning web application that predicts the risk of heart disease based on standard clinical parameters. The system uses a calibrated XGBoost model served through a Flask REST API and a modern Next.js frontend for user interaction.

---

## 📌 Project Overview

Heart disease is one of the leading causes of death worldwide. Early detection using clinical indicators can significantly improve patient outcomes.  
This project provides a user-friendly web application that predicts heart disease risk using machine learning.

Users enter medical data through a web interface, which is processed by a trained ML model to return a probability-based risk assessment.

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
5. Prediction probabilities are calibrated for reliability
6. API returns prediction result, probability, and risk level

---

## 🧠 Machine Learning Details

- **Algorithm:** XGBoost Classifier
- **Calibration:** Probability calibration applied
- **Dataset:** UCI Heart Disease Dataset (303 samples)
- **Number of Features:** 13
- **Evaluation Metric:** ROC-AUC ≈ 0.85
- **Preprocessing Techniques:**
  - Median imputation for missing values
  - StandardScaler for feature normalization
- **Model Storage:** `joblib` pipeline

**Model File Path:**

---

## 📥 Input Features

| Feature  | Description                       |
| -------- | --------------------------------- |
| age      | Age in years                      |
| sex      | Gender (0 = Female, 1 = Male)     |
| cp       | Chest pain type                   |
| trestbps | Resting blood pressure            |
| chol     | Serum cholesterol                 |
| fbs      | Fasting blood sugar               |
| restecg  | Resting ECG results               |
| thalach  | Maximum heart rate achieved       |
| exang    | Exercise-induced angina           |
| oldpeak  | ST depression induced by exercise |
| slope    | Slope of peak exercise ST segment |
| ca       | Number of major vessels           |
| thal     | Thalassemia type                  |

---

## 📤 API Response Format

```json
{
  "prediction": 1,
  "probability": 0.82,
  "risk_level": "High"
}

prediction:

1 → Heart Disease Detected

0 → No Heart Disease

risk_level: Low / Medium / High (based on probability thresholds)

📁 Project Structure
Heart-Disease-Detection/
│
├── heart-backend/
│   ├── app.py
│   ├── train_model.py
│   ├── evaluation_model.py
│   ├── test_api.py
│   ├── requirements.txt
│   └── models/
│       └── heart_xgb_pipeline.joblib
│
├── heart-frontend/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   ├── prediction-form.tsx
│   │   └── result-card.tsx
│   ├── login/
│   ├── register/
│   └── package.json
│
└── README.md

▶️ How to Run Locally
Backend Setup
cd heart-backend
pip install -r requirements.txt
python app.py


Backend runs on:

http://localhost:5000

Frontend Setup
cd heart-frontend
npm install
npm run dev


Frontend runs on:

http://localhost:3000

⚙️ Environment Variables
Backend Environment Variables
Variable	Description
FLASK_ENV	development / production
MODEL_PATH	Path to the ML model
ALLOWED_ORIGINS	Allowed CORS origins
PORT	Flask server port (default: 5000)
🧪 Testing

Backend API Testing

python test_api.py


Frontend Testing
Uses built-in Next.js linting and testing tools.

🚀 Deployment

Backend:
Can be deployed on AWS, Render, Heroku, or any Python hosting service

Frontend:
Optimized for deployment on Vercel

CORS:
Configured for secure cross-origin communication

🎯 Key Features

Full-stack machine learning deployment

Probability-calibrated medical predictions

RESTful API architecture

Responsive and intuitive UI

Real-world healthcare use case

Scalable and production-ready design

📈 Future Enhancements

Doctor/Admin dashboard

Larger dataset training and model retraining

Explainable AI (SHAP / feature importance)

Integration with Electronic Health Records (EHR)

Cloud-based authentication and authorization
```
