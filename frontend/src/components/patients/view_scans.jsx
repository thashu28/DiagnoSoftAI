import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPatientById } from "../../../services/PatientService";
import { useLocation } from "react-router-dom";

const PatientViewScans = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [scans, setScans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch patient scans
  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        if (user?.id) {
          const response = await getPatientById(user.id);
          setScans(response.data.mriScans || []);
        }
      } catch (error) {
        console.error("Error fetching scans:", error);
      }
    };

    fetchReportDetails();
  }, [user]);

  // Filter scans based on search query
  const filteredScans = scans.filter((scan) =>
    scan.scanType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 shadow-lg flex items-center justify-between">
        {/* Website Name */}
        <div className="font-serif italic text-blue-500 text-2xl tracking-wide">
          DiagnoSoftAI
        </div>
        {/* Patient Dashboard Title */}
        <h1 className="text-2xl font-bold" style={{ marginRight: "30rem" }}>Patient Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          View Your Medical Scans
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search by scan type or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Scan Blocks */}
        {filteredScans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScans.map((scan) => (
              <div
                key={scan.id}
                className="bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105"
              >
                {/* Scan Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {scan.scanType}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      scan.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {scan.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {scan.description}
                </p>

                {/* Additional Details */}
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Requested By:</strong> {scan.requestedBy}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Upload Date:</strong>{" "}
                    {new Date(scan.uploadDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Comments:</strong> {scan.comments || "N/A"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4">
                  {scan.status === "Completed" ? (
                    <Link
                      to={scan.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-400 transition"
                    >
                      View Full Scan
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="block bg-gray-300 text-gray-500 text-center py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Pending
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No scans found. Please adjust your search query.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PatientViewScans;
