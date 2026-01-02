from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import joblib
import pandas as pd
import os
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

app = Flask(__name__)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')  # Change this in production
jwt = JWTManager(app)

# MongoDB Configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://chatbuddy:gSuUH2G*4whp8P4@cluster0.92nk5.mongodb.net/MERN-CHATAPP?retryWrites=true&w=majority&appName=Cluster0')
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("✅ MongoDB connected successfully!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    client = None

if client:
    db = client['heart_disease_app']
    users_collection = db['users']
else:
    db = None
    users_collection = None

# Load environment variables or set defaults
MODEL_PATH = os.getenv('MODEL_PATH', os.path.join(os.path.dirname(__file__), 'models', 'heart.pkl'))
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000,http://192.168.31.137:3000,https://*.vercel.app').split(',')
PORT = int(os.getenv('PORT', 5000))

# Load the model
try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    print(f"Model file not found at {MODEL_PATH}. Please ensure the model is trained and saved.")
    model = None

# Configure CORS
CORS(app, origins=ALLOWED_ORIGINS)

@app.route('/')
def home():
    return jsonify({"message": "Heart Disease Detection API running"})

@app.route('/register', methods=['POST'])
def register():
    try:
        if users_collection is None:
            return jsonify({"error": "Database not connected"}), 500

        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        # Check if user already exists
        if users_collection.find_one({"username": username}):
            return jsonify({"error": "User already exists"}), 400

        # Hash password and save user
        hashed_password = generate_password_hash(password)
        users_collection.insert_one({
            "username": username,
            "password": hashed_password,
            "created_at": datetime.datetime.utcnow()
        })

        # Create access token for auto-login
        access_token = create_access_token(identity=username)
        return jsonify({"message": "User registered successfully", "access_token": access_token}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        # Find user
        user = users_collection.find_one({"username": username})
        if not user or not check_password_hash(user['password'], password):
            return jsonify({"error": "Invalid credentials"}), 401

        # Create access token
        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # In a stateless JWT system, logout is handled client-side by removing the token
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}!"}), 200

def convert_input(data):
    mapping = {
        # Sex
        "Male": 1, "Female": 0,

        # Chest Pain Type (cp)
        "Typical Angina": 0,
        "Atypical Angina": 1,
        "Non-anginal Pain": 2,
        "Asymptomatic": 3,

        # Fasting Blood Sugar (fbs)
        "Yes": 1, "No": 0,

        # Resting ECG (restecg)
        "Normal": 0,
        "ST-T wave abnormality": 1,
        "Left ventricular hypertrophy": 2,

        # Exercise Induced Angina (exang)
        "Yes": 1, "No": 0,

        # Slope of ST segment (slope)
        "Upsloping": 0,
        "Flat": 1,
        "Downsloping": 2,

        # Thalassemia (thal)
        "Normal": 3,
        "Fixed Defect": 6,
        "Reversible Defect": 7
    }

    for key, value in data.items():
        if value in mapping:
            data[key] = mapping[value]
    return data

@app.route('/predict', methods=['POST'])
# @jwt_required()  # Temporarily disabled for testing
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Convert categorical inputs to numerical
        data = convert_input(data)

        # Extract features
        features = {
            'age': data.get('age'),
            'sex': data.get('sex'),
            'cp': data.get('cp'),
            'trestbps': data.get('trestbps'),
            'chol': data.get('chol'),
            'fbs': data.get('fbs'),
            'restecg': data.get('restecg'),
            'thalach': data.get('thalach'),
            'exang': data.get('exang'),
            'oldpeak': data.get('oldpeak'),
            'slope': data.get('slope'),
            'ca': data.get('ca'),
            'thal': data.get('thal')
        }

        # Check for missing features
        missing = [k for k, v in features.items() if v is None]
        if missing:
            return jsonify({"error": f"Missing features: {missing}"}), 400

        # Create DataFrame
        df = pd.DataFrame([features])

        # Make prediction
        prediction = int(model.predict(df)[0])
        probability = float(model.predict_proba(df)[0][1])

        # Determine risk level
        if probability < 0.3:
            risk_level = "Low"
        elif probability <= 0.7:
            risk_level = "Medium"
        else:
            risk_level = "High"

        return jsonify({
            "prediction": prediction,
            "probability": round(probability, 2),
            "risk_level": risk_level
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
