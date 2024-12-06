import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { getDoctorById } from "../../../services/DoctorService"; // Assuming a service exists for fetching doctor data

const DoctorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { user } = location.state || {}; // Access user object from location state
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
        console.log(user.id)
      try {
        if (user?.id) {
          console.log(user.id)
          const response = await getDoctorById(user.id); // Fetch doctor data using user ID
          setDoctorData(response.data);
        } else {
          setError("User ID not found.");
        }
      } catch (err) {
        console.error("Error fetching doctor details:", err);
        setError("An error occurred while fetching doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
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
        <h1 className="text-3xl font-bold">Doctor Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        {doctorData ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {doctorData.name}
            </h2>
            <p>
              <strong>Specialization:</strong> {doctorData.specialization || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong> {doctorData.experience || "N/A"} years
            </p>
            <p>
              <strong>Email:</strong> {doctorData.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {doctorData.phone || "N/A"}
            </p>
            <p>
              <strong>Qualifications:</strong>{" "}
              {doctorData.qualifications.length > 0
                ? doctorData.qualifications.join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Clinic Address:</strong>{" "}
              {doctorData.clinicAddress || "N/A"}
            </p>
            <p>
              <strong>Patients Treated:</strong> {doctorData.patientsTreated || 0}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {doctorData.availability
                ? `${doctorData.availability.start} - ${doctorData.availability.end}`
                : "Not specified"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No doctor data available.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
