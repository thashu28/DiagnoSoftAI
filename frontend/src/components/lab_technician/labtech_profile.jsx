import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LabTechnicianProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {}; // Access user object from location state

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate("/"); // Redirect to the home page
  };

  if (!user) {
    return <p className="text-red-500">No user data available.</p>;
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
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p>
            <strong>Employee ID:</strong> {user.employeeId || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || "N/A"}
          </p>
          <p>
            <strong>Specialization:</strong> {user.specialization || "N/A"}
          </p>
          <p>
            <strong>Years of Experience:</strong> {user.experience || "N/A"}
          </p>
          <p>
            <strong>Laboratory:</strong> {user.laboratory || "N/A"}
          </p>
          <p>
            <strong>Certifications:</strong>{" "}
            {user.certifications?.length > 0 ? user.certifications.join(", ") : "None"}
          </p>
          <p>
            <strong>Availability:</strong>{" "}
            {user.availability || "No availability information"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabTechnicianProfile;
