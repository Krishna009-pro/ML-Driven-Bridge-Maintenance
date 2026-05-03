import cv2
import numpy as np
import threading
import mysql.connector
import time
from datetime import datetime

# Parameters
min_contour_width = 40  
min_contour_height = 40  
offset = 10  
line_height = 550  
matches = []
vehicles = 0
lock = threading.Lock()

def get_centrolid(x, y, w, h):
    cx = x + int(w / 2)
    cy = y + int(h / 2)
    return cx, cy

# Database handling function
def database_thread():
    global vehicles
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="vehicle_db"
    )
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS vehicle_log (timestamp DATETIME, count INT)")
    
    while True:
        now = datetime.now()
        if now.strftime('%H:%M') in ['05:00', '17:00']:  # 5:00 AM and 5:00 PM
            with lock:
                count = vehicles
                vehicles = 0  # Reset counter after storing
            timestamp = now.strftime('%Y-%m-%d %H:%M:%S')
            cursor.execute("INSERT INTO vehicle_log (timestamp, count) VALUES (%s, %s)", (timestamp, count))
            conn.commit()
            print(f"[DB] Saved {count} vehicles at {timestamp}")
        time.sleep(60)  # Check every minute

# Start database thread
db_thread = threading.Thread(target=database_thread, daemon=True)
db_thread.start()

def vehicle_detection():
    global vehicles
    cap = cv2.VideoCapture(0)
    cap.set(3, 1920)
    cap.set(4, 1080)
    
    if not cap.isOpened():
        print("Error: Camera not accessible")
        return

    ret, frame1 = cap.read()
    ret, frame2 = cap.read()

    while ret:
        d = cv2.absdiff(frame1, frame2)
        grey = cv2.cvtColor(d, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(grey, (5, 5), 0)
        _, th = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
        dilated = cv2.dilate(th, np.ones((3, 3)))
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
        closing = cv2.morphologyEx(dilated, cv2.MORPH_CLOSE, kernel)
        contours, _ = cv2.findContours(closing, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        
        for c in contours:
            x, y, w, h = cv2.boundingRect(c)
            if w >= min_contour_width and h >= min_contour_height:
                cv2.rectangle(frame1, (x-10, y-10), (x+w+10, y+h+10), (255, 0, 0), 2)
                cv2.line(frame1, (0, line_height), (1200, line_height), (0, 255, 0), 2)
                centrolid = get_centrolid(x, y, w, h)
                matches.append(centrolid)
                cv2.circle(frame1, centrolid, 5, (0, 255, 0), -1)
                
                for (mx, my) in matches:
                    if line_height - offset < my < line_height + offset:
                        with lock:
                            vehicles += 1
                        matches.remove((mx, my))

        cv2.putText(frame1, "Total Vehicle Detected: " + str(vehicles), (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 170, 0), 2)
        cv2.imshow("Vehicle Detection", frame1)
        if cv2.waitKey(1) == 27:
            break
        frame1 = frame2
        ret, frame2 = cap.read()

    cap.release()
    cv2.destroyAllWindows()

# Start vehicle detection thread
detection_thread = threading.Thread(target=vehicle_detection)
detection_thread.start()

detection_thread.join()
