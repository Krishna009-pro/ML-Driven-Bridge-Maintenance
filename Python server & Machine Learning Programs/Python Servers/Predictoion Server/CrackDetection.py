import cv2
import numpy as np
import matplotlib.pyplot as plt

def detect_cracks_refined(image_path):
    # Load the image
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)
    if image is None:
        print("Error: Could not load image.")
        return

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply GaussianBlur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Edge detection using Canny
    edges = cv2.Canny(blurred, threshold1=50, threshold2=150)

    # Morphological operations to enhance crack features
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    dilated = cv2.dilate(edges, kernel, iterations=1)

    # Find contours to filter out large straight edges (e.g., bridge edges)
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(dilated)  # Create a blank mask

    for contour in contours:
        # Filter based on contour properties
        area = cv2.contourArea(contour)
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = float(w) / h

        # Keep only small and elongated contours (likely cracks)
        if 10 < area < 5000 and 0.1 < aspect_ratio < 5.0:  # Adjust these thresholds as needed
            cv2.drawContours(mask, [contour], -1, 255, thickness=cv2.FILLED)

    # Calculate the total crack area
    crack_pixels = np.sum(mask > 0)  # Count non-zero pixels (cracks)
    # print(f"Total Crack Area (in pixels): {crack_pixels}")
    return crack_pixels
    

# # Path to the input image (replace with the actual path to your image)
# image_path = "cracks.jpg"

# # Run the refined function
# detect_cracks_refined(image_path)