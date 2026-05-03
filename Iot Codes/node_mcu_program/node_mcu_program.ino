#include <WiFi.h>
#include <HTTPClient.h>

#define RXD2 16
#define TXD2 17

const char* ssid = "xyz";
const char* password = "Password";

void setup() {
    Serial.begin(115200);
    Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2); // Use Serial2 for UART communication

    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");
}

void loop() {
    if (Serial2.available()) {
        if (WiFi.status() == WL_CONNECTED) {
            String receivedData = Serial2.readStringUntil('\n'); // Read incoming data
            Serial.println("Received: " + receivedData);

            HTTPClient http;
            http.begin("http://192.168.43.64:8080/Bridge%20Maintenance/IoTAPI?"+receivedData+"&id=1");

            int httpResponseCode = http.GET(); // Store the response code

            if (httpResponseCode > 0) {
                Serial.print("HTTP Request Sent. Response Code: ");
                Serial.println(httpResponseCode);
            } else {
                Serial.print("HTTP Request Failed. Error Code: ");
                Serial.println(httpResponseCode);
            }

            http.end(); // Ensure proper closing of HTTP connection
        } else {
            Serial.println("WiFi Disconnected");
        }
    }
}
