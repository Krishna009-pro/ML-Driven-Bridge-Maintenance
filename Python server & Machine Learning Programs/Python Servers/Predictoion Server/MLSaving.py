import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_absolute_error, accuracy_score
from sklearn.feature_selection import SelectFromModel

# Load dataset
df = pd.read_csv("bridge_predection_dataset.csv")

# Encode categorical variables
label_encoders = {}
categorical_columns = ["ConcreteType", "DesignType"]
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Define features and targets
features = df.drop(columns=["RemainingLifeSpan", "MaintenanceRequired", "Durability", "ID"])
X = features.values
feature_names = features.columns

y_lifespan = df["RemainingLifeSpan"].values  # Regression target
y_maintenance = df["MaintenanceRequired"].map({"Yes": 1, "No": 0}).values  # Classification target
y_durability = df["Durability"].values  # Regression target

# Feature Selection using RandomForest
feature_selector = RandomForestRegressor(n_estimators=100, random_state=42)
feature_selector.fit(X, y_lifespan)
selector = SelectFromModel(feature_selector, prefit=True)
X_selected = selector.transform(X)
selected_features = feature_names[selector.get_support()]

# Split data
X_train, X_test, y_train_lifespan, y_test_lifespan = train_test_split(X_selected, y_lifespan, test_size=0.2, random_state=42)
X_train_cls, X_test_cls, y_train_cls, y_test_cls = train_test_split(X_selected, y_maintenance, test_size=0.2, random_state=42)
X_train_dur, X_test_dur, y_train_dur, y_test_dur = train_test_split(X_selected, y_durability, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
X_train_cls = scaler.fit_transform(X_train_cls)
X_test_cls = scaler.transform(X_test_cls)
X_train_dur = scaler.fit_transform(X_train_dur)
X_test_dur = scaler.transform(X_test_dur)

# Train regression model for lifespan prediction
lifespan_model = RandomForestRegressor(n_estimators=100, random_state=42)
lifespan_model.fit(X_train, y_train_lifespan)
y_pred_lifespan = lifespan_model.predict(X_test)
lifespan_mae = mean_absolute_error(y_test_lifespan, y_pred_lifespan)
print(f"Lifespan Prediction MAE: {lifespan_mae:.2f} years")

# Train classification model for maintenance prediction
maintenance_model = RandomForestClassifier(n_estimators=100, random_state=42)
maintenance_model.fit(X_train_cls, y_train_cls)
y_pred_cls = maintenance_model.predict(X_test_cls)
maintenance_accuracy = accuracy_score(y_test_cls, y_pred_cls)
print(f"Maintenance Prediction Accuracy: {maintenance_accuracy:.2%}")

# Train regression model for durability prediction
durability_model = RandomForestRegressor(n_estimators=100, random_state=42)
durability_model.fit(X_train_dur, y_train_dur)
y_pred_durability = durability_model.predict(X_test_dur)
durability_mae = mean_absolute_error(y_test_dur, y_pred_durability)
print(f"Durability Prediction MAE: {durability_mae:.2f}")

# Save models
import joblib
joblib.dump(lifespan_model, "lifespan_model.pkl")
joblib.dump(maintenance_model, "maintenance_model.pkl")
joblib.dump(durability_model, "durability_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")
joblib.dump(selector, "feature_selector.pkl")

print("Models saved successfully.")
print(f"Selected Features: {list(selected_features)}")