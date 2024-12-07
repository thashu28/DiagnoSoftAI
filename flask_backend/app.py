from flask import Flask, request, jsonify, send_file
import os
import numpy as np
import nibabel as nib
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from io import BytesIO
from flask_cors import CORS

# Load the pre-trained model
model = load_model('C:/Users/thash/OneDrive/Documents/DiagnoSoftAI_flask/flask_backend/Brain_tumor_segmentation_model.h5')  # Path to the saved model file
# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Function to predict the tumor mask
def predict_tumor_mask(image_slice):
    predicted_mask = model.predict(image_slice)
    predicted_mask = np.squeeze(predicted_mask, axis=0)  # Remove batch dimension
    return predicted_mask

# Function to save the result as a PNG image
def save_result_as_png(base_image, predicted_mask):
    # Create a figure to plot both the base image and the predicted tumor mask
    plt.figure(figsize=(8,8))
    
    # Display the base image (TR slice)
    plt.imshow(base_image, cmap='inferno')
    
    # Display the predicted tumor mask overlaid on the base image
    plt.imshow(predicted_mask, alpha=0.3, cmap='plasma')  # Overlay the mask with alpha transparency
    
    # Save the figure as a PNG image and return as a BytesIO object for Flask
    plt.axis('off')
    plt.tight_layout()
    
    img_io = BytesIO()
    plt.savefig(img_io, format='png')
    img_io.seek(0)  # Reset the pointer to the beginning of the file
    plt.close()
    
    return img_io

# Function to load and preprocess the NIfTI image
def load_and_preprocess_nii(image_data):
    # Print shape to debug
    print("Image Shape:", image_data.shape)
    
    # Handle 2D images (single slice)
    if len(image_data.shape) == 2:
        image_slice = image_data  # Use the whole 2D image
    
    # Handle 3D images (multiple slices)
    elif len(image_data.shape) == 3:
        middle_slice_idx = image_data.shape[2] // 2
        image_slice = image_data[:, :, middle_slice_idx]  # Select the middle slice
    
    # Normalize and expand dimensions for model prediction
    image_slice = np.expand_dims(image_slice, axis=-1)  # Add channel dimension (to make it single channel)
    image_slice = np.expand_dims(image_slice, axis=0)  # Add batch dimension (for the model input)
    image_slice = image_slice.astype('float32')
    
    return image_slice

# Define a Flask route for the prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Check if the image file is part of the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found in the request'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Save the uploaded image temporarily
    input_nii_path = os.path.join('uploads', file.filename)
    file.save(input_nii_path)
    
    # Load the NIfTI image data
    nifti_file = nib.load(input_nii_path)
    image_data = np.asarray(nifti_file.dataobj)
    
    # Load and preprocess the NIfTI image
    image_slice = load_and_preprocess_nii(image_data)
    
    # Predict the tumor mask
    predicted_mask = predict_tumor_mask(image_slice)
    
    # Get the base image from the original NIfTI file (same slice)
    if len(image_data.shape) == 2:
        base_image = image_data
    elif len(image_data.shape) == 3:
        middle_slice_idx = image_data.shape[2] // 2
        base_image = image_data[:, :, middle_slice_idx]
    
    # Save the result as a PNG image (return as response)
    result_img_io = save_result_as_png(base_image, predicted_mask)
    
    # Return the image as a response (in PNG format)
    return send_file(result_img_io, mimetype='image/png')

if __name__ == '__main__':
    # Create the 'uploads' folder if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    # Run the Flask app on port 5001
    app.run(debug=True, port=5001)

