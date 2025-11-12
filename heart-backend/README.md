# Heart Disease Detection API

A Flask-based API for predicting heart disease risk using a trained XGBoost model.

## Setup

1. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Run the Flask app:

   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`.

## API Endpoints

### GET /

Returns a welcome message.

**Response:**

```json
{
  "message": "Heart Disease Detection API running"
}
```

### POST /predict

Predicts heart disease risk based on patient data.

**Request Body:**

```json
{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "fbs": 1,
  "restecg": 0,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 2.3,
  "slope": 0,
  "ca": 0,
  "thal": 1
}
```

**Response:**

```json
{
  "prediction": 1,
  "probability": 0.82,
  "risk_level": "High"
}
```

## Testing

Run the test script to verify the API:

```bash
python test_api.py
```

## Frontend Integration

The API is configured with CORS to allow requests from:

- `http://localhost:3000` (local development)
- `https://*.vercel.app` (production deployments)

To connect from the frontend, send a POST request to `${API_URL}/predict` with the patient data.

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

- `FLASK_ENV`: Set to `development` or `production`
- `MODEL_PATH`: Path to the trained model file
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `PORT`: Port to run the Flask app on
