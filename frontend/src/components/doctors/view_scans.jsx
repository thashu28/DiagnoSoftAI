import React, { useState } from "react";

// Static data for demonstration
const staticPatients = [
  {
    id: 1,
    name: "John Doe",
    condition: "Critical",
    scanImage: "https://via.placeholder.com/600x400?text=John+Doe+Scan",
    aiSegmentedImage: "https://via.placeholder.com/600x400?text=Segmented+John+Doe",
    aiAnalysis: "The scan indicates a high likelihood of glioblastoma in the left frontal lobe.",
    report: "John Doe Report.pdf",
  },
  {
    id: 2,
    name: "Jane Smith",
    condition: "Stable",
    scanImage: "https://via.placeholder.com/600x400?text=Jane+Smith+Scan",
    aiSegmentedImage: "https://via.placeholder.com/600x400?text=Segmented+Jane+Smith",
    aiAnalysis: "No significant anomalies detected. Regular follow-up advised.",
    report: "Jane Smith Report.pdf",
  },
];

const ViewScanReportsForDoctors = () => {
  const [selectedPatient, setSelectedPatient] = useState(staticPatients[0]); // Default patient

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar (Assigned Scans - 1/4th Width) */}
      <aside className="w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">Assigned Scans</h2>
        <ul className="mt-4 space-y-4">
          {staticPatients.map((patient) => (
            <li
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedPatient.id === patient.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <h3 className="text-md font-semibold">{patient.name}</h3>
              <p className="text-sm">Condition: {patient.condition}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Middle Content (Scan & AI Analysis - 1/2 Width) */}
      <main className="flex-1 p-6">
        <header className="bg-white p-4 rounded shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700">
            Patient: {selectedPatient.name}
          </h1>
          <p className="text-gray-500">Condition: {selectedPatient.condition}</p>
        </header>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scan Details */}
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Scan Details</h2>
            <img
              src={selectedPatient.scanImage}
              alt={`${selectedPatient.name}'s Scan`}
              className="mt-4 w-full rounded shadow"
            />
          </div>

          {/* AI Analysis Results */}
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">AI Analysis</h2>
            <img
              src={selectedPatient.aiSegmentedImage}
              alt={`${selectedPatient.name}'s AI Segmentation`}
              className="mt-4 w-full rounded shadow"
            />
            <p className="mt-4 text-gray-700">{selectedPatient.aiAnalysis}</p>
          </div>
        </div>
      </main>

      {/* Right Sidebar (Doctor's Notes - 1/4th Width) */}
      <aside className="w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">Doctor's Notes</h2>
        <textarea
          rows="6"
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          placeholder={`Write your observations for ${selectedPatient.name} here...`}
        ></textarea>
        <div className="mt-4 flex justify-between">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save Notes
          </button>
          <a
            href={`#`}
            download={selectedPatient.report}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Report
          </a>
        </div>
      </aside>
    </div>
  );
};

export default ViewScanReportsForDoctors;
