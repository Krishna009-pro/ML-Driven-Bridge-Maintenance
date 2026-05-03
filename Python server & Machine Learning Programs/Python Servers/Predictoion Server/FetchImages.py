import os
from PIL import Image  # Optional, for validating image files

def get_image_names_from_folder(folder_path):

    image_names = []

    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
        return image_names

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        if os.path.isfile(file_path):
            # Basic check for common image extensions (case-insensitive)
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp')):
                image_names.append(filename)

            

    return image_names
