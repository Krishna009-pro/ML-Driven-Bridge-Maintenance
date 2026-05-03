import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler

# Load saved models
lifespan_model = joblib.load("lifespan_model.pkl")
maintenance_model = joblib.load("maintenance_model.pkl")
durability_model = joblib.load("durability_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoders = joblib.load("label_encoders.pkl")
selector = joblib.load("feature_selector.pkl")


# Define prediction function
def predict_bridge_condition(input_data):
    
    # Concrete type mapping
    concrete_mapping = {
        "Prestressed": "High-Strength",
        "Reinforced": "Normal",
        "Self-Healing": "Self-Consolidating",
        "Ordinary": "Self-Consolidating",
        "High-Strength": "High-Strength",
        "Normal": "Normal",
        "Self-Consolidating": "Self-Consolidating"
    }

    input_data.update({"ConcreteType": concrete_mapping[input_data["ConcreteType"]]})
    
    
    
    """Predicts remaining lifespan, durability, and maintenance need."""
    input_df = pd.DataFrame([input_data])
    
    # Encode categorical variables safely
    for col in label_encoders:
        if col in input_df:
            known_classes = list(label_encoders[col].classes_)  # Get trained categories
            
            if input_df[col].iloc[0] not in known_classes:
                print(f"Warning: Unknown category '{input_df[col].iloc[0]}' in column '{col}', assigning closest match.")
                
                # Assign the most common category instead of 'Unknown'
                input_df[col] = known_classes[0]
            
            input_df[col] = label_encoders[col].transform(input_df[col])

    # Select features
    X_selected = selector.transform(input_df.values)
    
    # Scale features
    X_scaled = scaler.transform(X_selected)
    
    # Make predictions
    lifespan_pred = lifespan_model.predict(X_scaled)[0]
    durability_pred = durability_model.predict(X_scaled)[0]
    maintenance_pred = maintenance_model.predict(X_scaled)[0]
    maintenance_pred = "Yes" if maintenance_pred == 1 else "No"
    
    return {
        "Remaining Life Span": lifespan_pred,
        "Durability": durability_pred,
        "Maintenance Required": maintenance_pred
    }

# Function to pass input parameters
def get_bridge_parameters():
    """Generates or takes user input for bridge parameters and calls prediction function."""
    sample_input = {
        "YearBuilt": 1995,
        "Age": 29,
        "ConcreteType": "Prestressed",
        "DesignType": "Arch",
        "Rated_Load_Capacity": 50000,
        "SlabThickness": 0.3,
        "Bear_Surface_Area": 50,
        "No_Of_Beams": 4,
        "Length": 150,
        "Width": 20,
        "Height": 10,
        "MinimumTemperature": -10,
        "AverageTemperature": 15,
        "MaximumTemperature": 35,
        "MinimumRelativeHumidity": 30,
        "AverageRelativeHumidity": 60,
        "MaximumRelativeHumidity": 90,
        "AverageWindSpeed": 5,
        "MinimumNO2": 10,
        "AverageNO2": 30,
        "MaximumNO2": 50,
        "MinimumSO2": 5,
        "AverageSO2": 15,
        "MaximumSO2": 25,
        "MinimumCO": 0.1,
        "AverageCO": 0.5,
        "MaximumCO": 1.0,
        "MinimumCO2": 350,
        "AverageCO2": 400,
        "MaximumCO2": 450,
        "MinimumRain": 0,
        "AverageRain": 50,
        "MaximumRain": 200,
        "MinimumWaterLevel": 0.5,
        "AverageWaterLevel": 2.0,
        "MaximumWaterLevel": 4.0,
        "MinimumTrafficVolume": 1000,
        "AverageTrafficVolume": 5000,
        "MaximumTrafficVolume": 10000,
        "SpeedLimit": 60,
        "No_of_Maintenance": 5,
        "No_Of_Vehicle_Passed": 1000000,
        "AverageTimeGapInMaintenance": 2,
        "Ultrasonic Testing (UT)": 1,
        "Ground Penetrating Radar (GPR)": 1,
        "Acoustic Emission (AE) Testing": 1,
        "Rebound Hammer Test (Schmidt Hammer Test)": 1,
        "Crack_Surface_Area": 10,
    }
    
    return predict_bridge_condition(sample_input)

# # Example Usage
# if __name__ == "__main__":
#     results = get_bridge_parameters()
#     print("Predicted Bridge Condition:")
#     print(results)