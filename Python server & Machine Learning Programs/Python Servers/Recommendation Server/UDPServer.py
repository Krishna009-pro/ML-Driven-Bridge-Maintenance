import socket
import joblib
from datetime import datetime
import json
from ML_MODEL import predict

server_address = ('192.168.43.64', 12345)  # Update here

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
    data, client_address = sock.recvfrom(1024)
    message = data.decode()
    print(f"Received message: {message} from {client_address}")

    # Process the message (e.g., convert to uppercase)
    

    data_dict = json.loads(message)

    # function for conversion
    # Function to convert date to numerical value (days since reference date)
    def date_to_numerical(date_str):
        date_format = "%Y-%m-%d"
        ref_date = datetime.strptime("2020-01-01", date_format)  # Example reference date
        date_obj = datetime.strptime(date_str, date_format)
        return (date_obj - ref_date).days  # Number of days since the reference date




    predictions = str(predict(data_dict))

    # Send the processed message back to the client
    sock.sendto(predictions.encode(), client_address)
    print(f"Processed message sent: {predictions}")

    # Wait for confirmation from the client
    confirmation, client_address = sock.recvfrom(1024)
    if confirmation.decode() == "ACK":
        print("Confirmation received. Ready for the next message.")
    else:
        print("No confirmation received. Resending data...")
        sock.sendto(predictions.encode(), client_address)
