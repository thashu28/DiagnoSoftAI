import React, { useState } from "react";
import { Link } from "react-router-dom";

// Static data for the logged-in patient's scans
const patientScans = [
  {
    id: "S001",
    scanType: "MRI",
    scanStatus: "Completed",
    scanUrl: "https://via.placeholder.com/300", // Replace with real scan URL
    scanDate: "2024-11-20",
    comments: "Brain MRI shows minor abnormalities.",
  },
  {
    id: "S002",
    scanType: "CT Scan",
    scanStatus: "Pending",
    scanUrl: "https://via.placeholder.com/300", // Replace with real scan URL
    scanDate: "2024-11-18",
    comments: "Scheduled for review next week.",
  },
  {
    id: "S003",
    scanType: "X-Ray",
    scanStatus: "Completed",
    scanUrl: "https://via.placeholder.com/300", // Replace with real scan URL
    scanDate: "2024-11-15",
    comments: "No fractures detected.",
  },
];

const PatientViewScans = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter scans based on search input
  const filteredScans = patientScans.filter((scan) =>
    scan.scanType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
       {/* Header */}
      <header className="bg-yellow-800 text-white p-4">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
      </header>
      

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">View Your Medical Scans</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Search by scan type (e.g., MRI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Scan Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScans.map((scan) => (
            <div
              key={scan.id}
              className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold">{scan.scanType}</h3>
              <p className="text-sm text-gray-600">ID: {scan.id}</p>
              <p className="text-sm text-gray-600">Scan Status: {scan.scanStatus}</p>
              <p className="text-sm text-gray-600">Scan Date: {scan.scanDate}</p>
              <p className="text-sm text-gray-600 text-center">{scan.comments}</p>
              <img
                src={scan.scanUrl}
                alt={`Scan for ${scan.scanType}`}
                className="mt-4 w-full h-auto rounded-lg"
              />
              <Link
                to={scan.scanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400"
              >
                View Full Scan
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-yellow-800 text-white text-center p-4">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PatientViewScans;
