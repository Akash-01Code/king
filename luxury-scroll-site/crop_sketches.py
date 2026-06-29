from PIL import Image
import os

image_path = r"c:\Users\pravi\Downloads\real-estate-again\antigravity-trial\luxury-scroll-site\ChatGPT Image Jun 27, 2026, 04_14_50 PM.png"
output_dir = r"c:\Users\pravi\Downloads\real-estate-again\antigravity-trial\luxury-scroll-site\public\images\sketches"

os.makedirs(output_dir, exist_ok=True)

try:
    img = Image.open(image_path)
    width, height = img.size
    
    # Divide into 3 columns and 3 rows
    cell_width = width // 3
    cell_height = height // 3
    
    for row in range(3):
        for col in range(3):
            left = col * cell_width
            top = row * cell_height
            right = (col + 1) * cell_width
            bottom = (row + 1) * cell_height
            
            cropped = img.crop((left, top, right, bottom))
            index = row * 3 + col + 1
            output_name = f"sketch-{index}.png"
            output_path = os.path.join(output_dir, output_name)
            cropped.save(output_path)
            print(f"Successfully saved {output_name}")
            
except Exception as e:
    print(f"Error: {e}")
