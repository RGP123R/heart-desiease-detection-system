import requests

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

url = "http://localhost:5000/predict"
data = {
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

try:
    res = requests.post(url, json=data)
    print(res.json())
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
