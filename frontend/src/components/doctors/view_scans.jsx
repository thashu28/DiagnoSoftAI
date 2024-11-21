import React, { useState } from "react";
import { Link } from "react-router-dom";

// Publicly available medical scan images (these are placeholder URLs, replace with real ones)
const publicScans = [
  {
    id: "P123",
    name: "Alice Johnson",
    age: 45,
    gender: "Female",
    diagnosis: "Severe Asthma Attack",
    scanStatus: "Pending",
    scanUrl: "https://www.example.com/scan1.jpg", // Replace with real public scan URL
    scanDate: "2024-11-20",
  },
  {
    id: "P124",
    name: "Bob Brown",
    age: 56,
    gender: "Male",
    diagnosis: "Heart Failure",
    scanStatus: "In Progress",
    scanUrl: "https://www.example.com/scan2.jpg", // Replace with real public scan URL
    scanDate: "2024-11-19",
  },
  {
    id: "P125",
    name: "Mary Wilson",
    age: 32,
    gender: "Female",
    diagnosis: "Stroke",
    scanStatus: "Completed",
    scanUrl: "https://www.example.com/scan3.jpg", // Replace with real public scan URL
    scanDate: "2024-11-18",
  },
  {
    id: "P126",
    name: "James Miller",
    age: 67,
    gender: "Male",
    diagnosis: "Fractured Leg",
    scanStatus: "Pending",
    scanUrl: "https://www.example.com/scan4.jpg", // Replace with real public scan URL
    scanDate: "2024-11-21",
  },
];

// Search Functionality
const ViewScans = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = publicScans.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white py-4 px-8">
        <h1 className="text-2xl font-bold">View Patient Scans</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Left Sidebar (Notes and AI Analysis) */}
        <aside className="w-full lg:w-1/3 bg-blue-50 p-6 border-b lg:border-r">
          <h2 className="text-xl font-semibold mb-4">Notes & AI Scan Analysis</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Notes</h3>
            <textarea
              rows="5"
              className="w-full p-3 mt-2 border rounded-lg"
              placeholder="Add your notes here..."
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">Analyze Scans Using AI Models</h3>
            <button className="w-full mt-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-400">
              Start AI Scan Analysis
            </button>
          </div>
        </aside>

        {/* Main Section with Patient Blocks */}
        <main className="w-full lg:w-2/3 p-6">
          <h2 className="text-xl font-semibold mb-4">Patient Scan Blocks</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Search for a patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPatients.map((patient, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
              >
                <h3 className="text-lg font-semibold">{patient.name}</h3>
                <p className="text-sm text-gray-600">ID: {patient.id}</p>
                <p className="text-sm text-gray-600">Age: {patient.age}</p>
                <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
                <p className="text-sm text-gray-600">Diagnosis: {patient.diagnosis}</p>
                <p className="text-sm text-gray-600">Scan Status: {patient.scanStatus}</p>
                <p className="text-sm text-gray-600">Scan Date: {patient.scanDate}</p>
                <img
                  src={patient.scanUrl}
                  alt={`Scan for ${patient.name}`}
                  className="mt-4 w-full h-auto rounded-lg"
                />
                <Link
                  to={patient.scanUrl}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400"
                >
                  View Scan
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-4 text-center">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ViewScans;
