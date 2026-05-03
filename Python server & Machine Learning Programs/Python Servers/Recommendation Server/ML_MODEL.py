import pandas as pd
import numpy as np
import joblib

def load_models():
    lifespan_model = joblib.load("lifespan_model.pkl")
    maintenance_model = joblib.load("maintenance_model.pkl")
    durability_model = joblib.load("durability_model.pkl")
    return lifespan_model, maintenance_model, durability_model


lifespan_model, maintenance_model, durability_model = load_models()


def feature_engineering(input_df):
    """Create derived features to match training dataset."""
    input_df["Bridge_Area"] = input_df["Length"] * input_df["Width"]
    input_df["Temperature_Range"] = input_df["MaximumTemperature"] - input_df["MinimumTemperature"]
    input_df["Humidity_Range"] = input_df["MaximumRelativeHumidity"] - input_df["MinimumRelativeHumidity"]
    input_df["CO_Range"] = input_df["MaximumCO"] - input_df["MinimumCO"]
    input_df["CO2_Range"] = input_df["MaximumCO2"] - input_df["MinimumCO2"]
    input_df["Traffic_Volume_Range"] = input_df["MaximumTrafficVolume"] - input_df["MinimumTrafficVolume"]
    return input_df

def predict(input_data):
    
    
    input_df = pd.DataFrame([input_data])

    # Apply feature engineering
    input_df = feature_engineering(input_df)
    
    predicted_lifespan = lifespan_model.predict(input_df)[0]
    predicted_maintenance = maintenance_model.predict(input_df)[0]
    predicted_durability = durability_model.predict(input_df)[0]
    
    return {
        "Predicted Lifespan (years)": predicted_lifespan,
        "Maintenance Required": bool(predicted_maintenance),
        "Predicted Durability (%)": predicted_durability
    }

# Example input
input_data_example = {
    "Age": 25,
    "Rated_Load_Capacity": 150,
    "SlabThickness": 0.5,
    "Bear_Surface_Area": 2000,
    "No_Of_Beams": 10,
    "Length": 500,
    "Width": 30,
    "Height": 50,
    "MinimumTemperature": 5,
    "AverageTemperature": 15,
    "MaximumTemperature": 25,
    "MinimumRelativeHumidity": 40,
    "AverageRelativeHumidity": 60,
    "MaximumRelativeHumidity": 80,
    "AverageWindSpeed": 10,
    "MinimumNO2": 10,
    "AverageNO2": 20,
    "MaximumNO2": 30,
    "MinimumSO2": 2,
    "AverageSO2": 5,
    "MaximumSO2": 8,
    "MinimumCO": 0.3,
    "AverageCO": 0.5,
    "MaximumCO": 0.7,
    "MinimumCO2": 280,
    "AverageCO2": 300,
    "MaximumCO2": 350,
    "MinimumRain": 50,
    "AverageRain": 120,
    "MaximumRain": 200,
    "MinimumWaterLevel": 2.0,
    "AverageWaterLevel": 3.0,
    "MaximumWaterLevel": 5.0,
    "MinimumTrafficVolume": 3000,
    "AverageTrafficVolume": 5000,
    "MaximumTrafficVolume": 10000,
    "SpeedLimit": 60,
    "No_of_Maintenance": 3,
    "No_Of_Vehicle_Passed": 500000,
    "AverageTimeGapInMaintenance": 1.5,
    "Crack_Surface_Area": 50.0
}

# Run prediction

predictions = predict(input_data_example)
print(predictions)
