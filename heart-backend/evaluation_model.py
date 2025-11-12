import joblib
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, roc_auc_score, confusion_matrix, ConfusionMatrixDisplay
from sklearn.calibration import calibration_curve

# === Load model and data ===
model = joblib.load("models/heart_xgb_pipeline.joblib")
df = pd.read_csv(r"C:\Users\Hemalatha P\Desktop\DL\heart-backend\Data\heart.csv")

X = df.drop("target", axis=1)
y = df["target"]

# === Predictions ===
y_proba = model.predict_proba(X)[:, 1]
y_pred = model.predict(X)

# === ROC Curve ===
fpr, tpr, _ = roc_curve(y, y_proba)
roc_auc = roc_auc_score(y, y_proba)

plt.figure(figsize=(7, 6))
plt.plot(fpr, tpr, label=f'ROC Curve (AUC = {roc_auc:.3f})')
plt.plot([0, 1], [0, 1], '--', color='gray')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.grid(True)
plt.show()

# === Calibration Curve ===
prob_true, prob_pred = calibration_curve(y, y_proba, n_bins=10)
plt.figure(figsize=(7, 6))
plt.plot(prob_pred, prob_true, marker='o', label='Model Calibration')
plt.plot([0, 1], [0, 1], '--', color='gray', label='Perfect Calibration')
plt.title('Calibration Curve')
plt.xlabel('Mean Predicted Probability')
plt.ylabel('Fraction of Positives')
plt.legend()
plt.grid(True)
plt.show()

# === Confusion Matrix ===
cm = confusion_matrix(y, y_pred)
ConfusionMatrixDisplay(cm, display_labels=['No Disease', 'Heart Disease']).plot(cmap='Blues')
plt.title("Confusion Matrix")
plt.show()

# === Probability Distribution ===
plt.figure(figsize=(7, 6))
plt.hist(y_proba[y == 0], bins=20, alpha=0.6, label='No Disease')
plt.hist(y_proba[y == 1], bins=20, alpha=0.6, label='Heart Disease')
plt.title('Predicted Probability Distribution')
plt.xlabel('Predicted Probability')
plt.ylabel('Count')
plt.legend()
plt.grid(True)
plt.show()

print("\n✅ Evaluation complete. Check plots for performance.")
