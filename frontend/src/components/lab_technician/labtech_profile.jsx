import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLabTechById } from "../../../services/LabtechService";

const LabTechnicianProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {}; // Access user object from location state
  const [labTechProfile, setLabTechProfile] = useState(null); // State to store lab technician data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate("/"); // Redirect to the home page
  };

  useEffect(() => {
    const fetchLabTechProfile = async () => {
      if (!user?.id) return; // Ensure the user ID exists
      try {
        setLoading(true);
        const response = await getLabTechById(user.id);
        setLabTechProfile(response.data); // Set the profile data
      } catch (err) {
        setError(err.message || "Failed to fetch lab technician details");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLabTechProfile();
  }, [user]);

  if (loading) {
    return <p className="text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!labTechProfile) {
    return <p className="text-red-500">No lab technician data available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lab Technician Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{labTechProfile.name}</h2>
          
          <p>
            <strong>Email:</strong> {labTechProfile.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {labTechProfile.phone || "N/A"}
          </p>
          <p>
            <strong>Specialization:</strong> {labTechProfile.specializedIn?.join(", ") || "N/A"}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default LabTechnicianProfile;
