#include <SoftwareSerial.h>
#include "HX711.h"  // Include the HX711 library




// Define HX711 objects
HX711 scale1;
HX711 scale2;

// Define HX711 Pins
#define DT1 6
#define SCK1 7
#define DT2 8
#define SCK2 9et

// Software Serial for ESP32 communication
SoftwareSerial mySerial(2, 3);  // RX, TX (Arduino to ESP32)

void setup() {
  Serial.begin(115200);  // Debugging via Serial Monitor
  mySerial.begin(9600);  // Communication with ESP32
  
  scale1.begin(DT1, SCK1);
  scale2.begin(DT2, SCK2);

  Serial.println("HX711 Modules Ready");
}

void loop() {
  if (scale1.is_ready() && scale2.is_ready()) {
    long weight1 = scale1.get_units(5); // Read first load cell
    long weight2 = scale2.get_units(5); // Read second load cell

    Serial.print("Load Cell 1: ");
    Serial.print(weight1);
    Serial.print(" g\t");

    Serial.print("Load Cell 2: ");
    Serial.print(weight2);
    Serial.println(" g");

    // ✅ Fixed Concatenation Issue
    mySerial.println("?Cell1=" + String(weight1) + "&Cell2=" + String(weight2));
  } else {
    Serial.println("Waiting for HX711...");
  }

  delay(100);  // Wait 1 second before next reading
}
