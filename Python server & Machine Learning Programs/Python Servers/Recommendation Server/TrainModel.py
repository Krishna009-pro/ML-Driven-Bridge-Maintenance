import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_absolute_error, accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
import joblib

# Load dataset
print("dataset")
df = pd.read_csv("bridge_maintenance_dataset.csv")

# Feature Engineering
print("Features engineering starting ..")
# Creating new features based on existing ones
df["Bridge_Area"] = df["Length"] * df["Width"]
df["Temperature_Range"] = df["MaximumTemperature"] - df["MinimumTemperature"]
df["Humidity_Range"] = df["MaximumRelativeHumidity"] - df["MinimumRelativeHumidity"]
df["CO_Range"] = df["MaximumCO"] - df["MinimumCO"]
df["CO2_Range"] = df["MaximumCO2"] - df["MinimumCO2"]
df["Traffic_Volume_Range"] = df["MaximumTrafficVolume"] - df["MinimumTrafficVolume"]

drop_cols = ["ID", "YearBuilt", "ConcreteType", "DesignType"]
targets = ["RemainingLifeSpan", "MaintenanceRequired", "Durability"]
features = df.drop(columns=drop_cols + targets)

# Train-test split
X_train, X_test, y_train_lifespan, y_test_lifespan = train_test_split(features, df["RemainingLifeSpan"], test_size=0.2, random_state=42)
X_train, X_test, y_train_maintenance, y_test_maintenance = train_test_split(features, df["MaintenanceRequired"], test_size=0.2, random_state=42)
X_train, X_test, y_train_durability, y_test_durability = train_test_split(features, df["Durability"], test_size=0.2, random_state=42)

# Data preprocessing
numeric_features = X_train.select_dtypes(include=[np.number]).columns.tolist()
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features)
    ]
)

print("reamaining lifespan")
# Train model for Remaining LifeSpan
model_lifespan = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42))
])
model_lifespan.fit(X_train, y_train_lifespan)
y_pred_lifespan = model_lifespan.predict(X_test)
print("Lifespan MAE:", mean_absolute_error(y_test_lifespan, y_pred_lifespan))

print("maintenance")
# Train model for Maintenance Need (Classification)
model_maintenance = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=200, max_depth=20, random_state=42))
])
model_maintenance.fit(X_train, y_train_maintenance)
y_pred_maintenance = model_maintenance.predict(X_test)
print("Maintenance Accuracy:", accuracy_score(y_test_maintenance, y_pred_maintenance))

print("durability")
# Train model for Durability
model_durability = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42))
])
model_durability.fit(X_train, y_train_durability)
y_pred_durability = model_durability.predict(X_test)
print("Durability MAE:", mean_absolute_error(y_test_durability, y_pred_durability))

# Save models
joblib.dump(model_lifespan, "lifespan_model.pkl")
joblib.dump(model_maintenance, "maintenance_model.pkl")
joblib.dump(model_durability, "durability_model.pkl")
print("Improved models saved successfully!")
