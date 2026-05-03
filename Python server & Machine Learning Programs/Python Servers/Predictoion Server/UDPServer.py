from MLModel import predict_bridge_condition
from CrackDetection import detect_cracks_refined
import socket
import joblib
from datetime import datetime
import json
from FetchImages import get_image_names_from_folder

server_address = ('192.168.43.64', 12346)  # Update here

#data_path = "bridge_lifespan_maintenance_dataset.csv"
#lifespan_model, maintenance_model, durability_model, scaler = train_models(data_path)

print("Modules loaded")

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
predictions="dummy"
# Bind the socket to the address
sock.bind(server_address)

print("Python UDP Server is listening...")

while True:
    # Receive a message
    data, client_address = sock.recvfrom(4096)
    message = data.decode("utf-8")
    print(f"Received message: {message} from {client_address}")

    # Process the message (e.g., convert to uppercase)
    
    crack_suraface_area = 0


    data_dict = json.loads(message)
    path = data_dict["Path"]
    image_array = get_image_names_from_folder(path)

    for i in image_array:
        crack_suraface_area += detect_cracks_refined(""+path+"/"+i)
    
    print("Total crack : ",crack_suraface_area)
    del data_dict["Path"]

    data_dict["Crack_Surface_Area"] = crack_suraface_area
    # function for conversion
    # Function to convert date to numerical value (days since reference date)
    def date_to_numerical(date_str):
        date_format = "%Y-%m-%d"
        ref_date = datetime.strptime("2020-01-01", date_format)  # Example reference date
        date_obj = datetime.strptime(date_str, date_format)
        return (date_obj - ref_date).days  # Number of days since the reference date




    predictions = str(predict_bridge_condition(data_dict))

    # Send the processed message back to the client
    sock.sendto(predictions.encode(), client_address)
    print(f"Processed message sent: {predictions}")

    # Wait for confirmation from the client
    confirmation, client_address = sock.recvfrom(4096)
    if confirmation.decode() == "ACK":
        print("Confirmation received. Ready for the next message.")
    else:
        print("No confirmation received. Resending data...")
        sock.sendto(predictions.encode(), client_address)
