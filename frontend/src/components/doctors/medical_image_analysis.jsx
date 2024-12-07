import React, { useState } from "react";
import axios from "axios";

const MedicalImageAnalysis = () => {
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [predictedImage, setPredictedImage] = useState(null); // State for the predicted image
  const [loading, setLoading] = useState(false); // Loading state for API request
  const [error, setError] = useState(null); // Error state for API request

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the uploaded image file
    }
  };

  // Handle API request to send the image and get prediction
  const handlePrediction = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Send the image to the Flask API for prediction
      const response = await axios.post("http://127.0.0.1:5001/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // We are expecting an image as response
      });

      // Convert the response to a URL for displaying the predicted image
      const imageUrl = URL.createObjectURL(response.data);
      setPredictedImage(imageUrl); // Set the predicted image to state

      console.log("Prediction successful!");
    } catch (error) {
      setError("Prediction failed. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-6">
      <h2 className="text-2xl font-semibold text-gray-700">Medical Image Analysis</h2>
      
      <div className="mt-6">
        <input
          type="file"
          accept=".nii,.nii.gz"
          onChange={handleImageUpload}
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handlePrediction}
          disabled={loading}
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Get Prediction"}
        </button>
      </div>

      {/* Display Predicted Image */}
      {predictedImage && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">Predicted Image:</h3>
          <img src={predictedImage} alt="Predicted Medical Image" className="mt-4 w-full h-auto" />
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default MedicalImageAnalysis;
