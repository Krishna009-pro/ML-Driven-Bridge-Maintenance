# 🌉 ML-Driven Predictive Maintenance & Lifespan Detection System

A multi-disciplinary solution for monitoring infrastructure integrity, focusing on bridges. This system integrates **IoT sensors**, **Computer Vision (CV)**, and **Machine Learning (ML)** to provide real-time data analysis, predictive maintenance alerts, and lifespan estimations.

---

## 📐 System Architecture

The system operates across several layers, from hardware data collection to a centralized web dashboard.

```mermaid
graph TD
    subgraph "Hardware Layer (IoT)"
        A[Arduino + HX711 Load Cells] -->|Serial| B[NodeMCU/ESP8266]
        B -->|HTTP/GET| C[Tomcat Java Server]
    end

    subgraph "Processing Layer (ML & CV)"
        D[Computer Vision: Vehicle Counting] -->|Data| E[Python ML Servers]
        F[Weather Data] -->|Updates| E
        E -->|UDP/Socket| G[Backend API]
    end

    subgraph "Application Layer (Dual Backend)"
        C --> H[(MySQL Database)]
        G --> H
        I[Node.js Backend] --- API Data --- J[React Frontend]
        K[Java Tomcat Backend] --- Core Logic --- H
    end
```

---

## 📂 Detailed Module Breakdown

### 1. Web Application & APIs
This project utilizes a **Dual-Backend Architecture** to handle different aspects of the system:
*   **Frontend (`Final UI`)**: A modern React application built with Vite. It serves as the primary interface for users to visualize bridge health, traffic loads, and maintenance alerts.
*   **Node.js Backend**: Handles dynamic API requests, user authentication, and serves as a middleware for frontend-to-database communication.
*   **Java Tomcat Backend (`Bridge Maintenance`)**: Manages core business logic through a series of Servlets. It handles critical data ingestion from IoT devices (`IoTAPI`), processes ML results (`MLAPI`), and manages administrative tasks like adding bridges and users.

### 2. Machine Learning Servers (`Python server & Machine Learning Programs`)
*   **Prediction Server**: Handles real-time lifespan prediction and durability analysis using pre-trained `.pkl` models.
*   **Recommendation Server**: Processes structural data to generate maintenance schedules and repair suggestions.
*   **Models Included**:
    *   `durability_model.pkl`: Predicts the structural durability based on load and environmental factors.
    *   `lifespan_model.pkl`: Estimates the remaining service life of the bridge.
    *   `maintenance_model.pkl`: Determines when the next maintenance cycle should occur.
    *   `CrackDetection.py`: An image-processing module for identifying structural cracks.

### 3. Computer Vision (`Computer Vision`)
*   **Vehicle Detection**: Uses OpenCV to monitor traffic flow.
*   **Counting Logic**: Tracks the number of vehicles passing over the bridge to calculate cumulative load stress.

### 4. IoT & Hardware (`Iot Codes`)
*   **Arduino Program**: Interfaces with **HX711 Load Cells** to measure weight/stress.
*   **NodeMCU Program**: Acts as a WiFi gateway, sending sensor data from the Arduino to the central server via HTTP requests.

### 5. Java Services (`Java Tomcat Server Programs`)
*   **Tomcat Servers**: Handle specific data ingestion tasks and legacy integration.
*   **Updation Services**: Background Java programs (`weatherUpdation`, `RecommendationUpdate`) that periodically sync environmental data and recalculate ML parameters.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Axios, Chart.js/Recharts |
| **Backend** | Node.js (Express), Java (Tomcat Servlets) |
| **ML/CV** | Python 3, OpenCV, Scikit-learn, Pandas, NumPy |
| **Database** | MySQL |
| **IoT** | C++ (Arduino), ESP8266/NodeMCU, HX711 Load Cells |
| **Servers** | Apache Tomcat, Python UDP/Flask Servers |

---

## ☕ Java Dependencies & Compilation

The Java components (Tomcat Servlets and Background Update programs) require specific libraries for database connectivity and JSON processing. These programs now use **Environment Variables** for sensitive data like API keys.

### Required JAR Files
These files are already included in their respective `WEB-INF/lib` or project folders:
*   **`mysql-connector-j-9.1.0.jar`**: MySQL JDBC driver for database communication.
*   **`json-simple-1.1.1.jar`**: Lightweight library for JSON encoding/decoding.
*   **`servlet-api.jar`**: Required for compiling Tomcat servlets (standard in Tomcat's `/lib` directory).

### Environment Variable Usage
The weather and air quality programs in `Java Updatation Program/weatherUpdation` are configured to read the `OPENWEATHER_API_KEY` from the system environment. 

> [!TIP]
> When running these Java programs, ensure the `OPENWEATHER_API_KEY` is set in your system environment variables or passed during execution.

### Compilation Guide
To manually compile the Java servlets, use the following command structure (ensure paths match your local Tomcat installation):

```bash
javac -cp "path/to/tomcat/lib/servlet-api.jar;WEB-INF/lib/*" -d . *.java
```

---

## 🔐 Configuration & Environment Variables

The Node.js backend requires environment variables to connect to the database. These are stored in a `.env` file within the backend directory.

### Backend Setup (`/backend/.env`)
Create a file named `.env` in `UI - react and node(backend)/Final UI/backend/` and configure the following:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=bridge_maintainance
OPENWEATHER_API_KEY=your_openweather_api_key
```

*   **`OPENWEATHER_API_KEY`**: Obtain this from [OpenWeatherMap](https://openweathermap.org/api). This key is used by the Java background programs to fetch real-time weather and air quality data.

> [!IMPORTANT]
> Never commit your actual `.env` file to version control. It has been added to the root `.gitignore` to prevent accidental leaks.

---

## ⚡ Automation & Helper Scripts

The project includes batch scripts to simplify the setup and execution process.

### `start_project.bat`
Located at the project root, this script automates the entire initialization of the Web Application layer. It performs the following steps:
1.  **Backend Dependencies**: Navigates to the Node.js backend folder and runs `npm install`.
2.  **Frontend Dependencies**: Navigates to the React frontend folder and runs `npm install`.
3.  **Database Migration**: Executes `node import_db.js` to set up the MySQL schema and initial data.
4.  **Backend Startup**: Launches the Node.js server in a new command window (Port 5000).
5.  **Frontend Startup**: Launches the Vite development server in a new command window (Port 5173).

> [!TIP]
> Run this script with administrative privileges if you encounter permission issues during `npm install`.

---

## 🚀 Installation & Setup

### 1. Database Setup
1.  Install MySQL Server.
2.  Import the database schema located at `Database/bridge_maintainance.sql`.

### 2. Web Application Setup
1.  Navigate to `UI - react and node(backend)/Final UI`.
2.  Run the automated setup:
    ```bash
    ../../start_project.bat
    ```
    *This will install dependencies for both frontend and backend and start the development servers.*

### 3. ML Servers Setup
1.  Install Python dependencies:
    ```bash
    pip install pandas numpy scikit-learn opencv-python flask
    ```
2.  Start the Prediction Server:
    ```bash
    cd "Python server & Machine Learning Programs/Python Servers/Predictoion Server"
    python UDPServer.py
    ```

### 4. IoT Deployment
1.  Open `Iot Codes/arduino_program/arduino_program.ino` in Arduino IDE.
2.  Upload to your Arduino (connected to HX711).
3.  Open `Iot Codes/node_mcu_program/node_mcu_program.ino`, configure your WiFi SSID/Password, and upload to the NodeMCU.

---

## 📊 Key Features

*   **Real-Time Stress Monitoring**: Live tracking of bridge load using IoT sensors.
*   **Automated Traffic Load Analysis**: CV-based vehicle counting to assess structural fatigue.
*   **Predictive Maintenance**: ML-driven alerts for potential structural failures.
*   **Environmental Integration**: Incorporates weather data to adjust durability predictions.
*   **User Management**: Secure portal for engineers and administrators.

---

## 📝 License
This project is developed for research and educational purposes in infrastructure management and AI application.
