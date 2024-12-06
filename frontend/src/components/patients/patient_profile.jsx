import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { getPatientById } from "../../../services/PatientService";

const PatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { user } = location.state || {}; // Access user object from location state
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        console.log(location.state)
        if (user?.id) {
          const response = await getPatientById(user.id); // Fetch patient data using user ID
          setPatientData(response.data);
        } else {
          setError("User ID not found.");
        }
      } catch (err) {
        console.error("Error fetching patient details:", err);
        setError("An error occurred while fetching patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [user]);

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate("/"); // Redirect to the home page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        {patientData ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {patientData.name}
            </h2>
            <p>
              <strong>Age:</strong> {patientData.age || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {patientData.gender || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {patientData.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {patientData.phone || "N/A"}
            </p>
            <p>
              <strong>Blood Type:</strong> {patientData.bloodType || "N/A"}
            </p>
            <p>
              <strong>Medical History:</strong>{" "}
              {patientData.medicalHistory.length > 0
                ? patientData.medicalHistory.join(", ")
                : "No history available"}
            </p>
            <p>
              <strong>Allergies:</strong>{" "}
              {patientData.allergies.length > 0
                ? patientData.allergies.join(", ")
                : "None"}
            </p>
            <p>
              <strong>Current Medication:</strong>{" "}
              {patientData.currentMedication.length > 0
                ? patientData.currentMedication.join(", ")
                : "None"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No patient data available.</p>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;  