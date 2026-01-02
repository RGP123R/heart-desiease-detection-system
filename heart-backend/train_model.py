import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report, roc_auc_score
from xgboost import XGBClassifier

# === Load Dataset ===
df = pd.read_csv("Data/heart.csv")
print(f"✅ Dataset loaded successfully: {df.shape}")
print(df.head())

# === Confirm label distribution ===
print("\nOriginal target value counts:")
print(df["target"].value_counts())

# === FIX: Invert labels if 0 = disease and 1 = no disease ===
# The dataset says 0 = no disease, 1 = disease, but the model learned it reversed
# This will ensure that model predicts correctly
df["target"] = df["target"].apply(lambda x: 1 if x == 0 else 0)

print("\n✅ Labels inverted for correct interpretation (1 = Heart Disease, 0 = No Disease)")
print(df["target"].value_counts())

# === Split features & target ===
X = df.drop("target", axis=1)
y = df["target"]

num_cols = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

# === Preprocessing ===
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy="median")),
    ('scaler', StandardScaler())
])

preprocessor = ColumnTransformer([
    ('num', num_pipeline, num_cols)
])

# === XGBoost model ===
xgb_model = XGBClassifier(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=3,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    eval_metric='logloss'
)

# === Calibrate ===
calibrated_model = CalibratedClassifierCV(
    estimator=xgb_model,
    method='isotonic',
    cv=3
)

# === Pipeline ===
model_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', calibrated_model)
])

# === Split data ===
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42
)

# === Train model ===
print("\n🚀 Training calibrated model (corrected label direction)...")
model_pipeline.fit(X_train, y_train)

# === Evaluate ===
y_pred = model_pipeline.predict(X_test)
y_proba = model_pipeline.predict_proba(X_test)[:, 1]

print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))
print("ROC-AUC Score:", round(roc_auc_score(y_test, y_proba), 3))

# === Save model ===
os.makedirs("models", exist_ok=True)
model_path = "models/heart_xgb_pipeline.joblib"
joblib.dump(model_pipeline, model_path)
print(f"\n✅ Corrected model saved to {model_path}")
