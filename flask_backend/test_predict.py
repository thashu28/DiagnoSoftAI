import requests

# URL of the Flask API
url = 'http://127.0.0.1:5001/predict'

# Path to the input NIfTI file (replace with your actual file path)
input_nii_path = 'C:/Users/thash/OneDrive/Documents/DiagnoSoftAI_flask/flask_backend/TR_data_sample_1450.nii'

# Open the NIfTI file to send it as part of the request
with open(input_nii_path, 'rb') as file:
    files = {'image': file}
    
    # Send a POST request to the Flask API with the file
    response = requests.post(url, files=files)

    # Check if the request was successful
    if response.status_code == 200:
        print("Prediction successful!")
        # Save the output image from the response
        with open('predicted_output.png', 'wb') as f:
            f.write(response.content)
        print("Predicted output saved as 'predicted_output.png'.")
    else:
        print(f"Failed to get prediction: {response.status_code}, {response.text}")
