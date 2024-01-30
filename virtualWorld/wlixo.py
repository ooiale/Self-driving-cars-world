import time
import pyautogui

# Function to perform the left click twice
def perform_left_clicks():
    pyautogui.click()  # First left click
    time.sleep(0.5)    # Add a small delay between clicks
    pyautogui.click()  # Second left click
    time.sleep(0.5)    # Add a small delay between clicks
    pyautogui.click()  # Second left click

# Number of iterations
for i in range(1000):
    perform_left_clicks()  # Call the function to perform left clicks
    time.sleep(1)         # Introduce a 20-second delay between iterations
