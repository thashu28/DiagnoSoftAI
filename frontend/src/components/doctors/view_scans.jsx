import React, { useState } from "react";
import { FiDownload, FiSave, FiFileText, FiUser } from "react-icons/fi";

// Static data for demonstration
const staticPatients = [
  {
    id: 1,
    name: "John Doe",
    condition: "Critical",
    scanImage: "https://via.placeholder.com/600x400?text=John+Doe+Scan",
    aiSegmentedImage: "https://via.placeholder.com/600x400?text=Segmented+John+Doe",
    aiAnalysis: "The scan indicates a high likelihood of glioblastoma in the left frontal lobe.",
    report: "John_Doe_Report.pdf",
  },
  {
    id: 2,
    name: "Jane Smith",
    condition: "Stable",
    scanImage: "https://via.placeholder.com/600x400?text=Jane+Smith+Scan",
    aiSegmentedImage: "https://via.placeholder.com/600x400?text=Segmented+Jane+Smith",
    aiAnalysis: "No significant anomalies detected. Regular follow-up advised.",
    report: "Jane_Smith_Report.pdf",
  },
];

const ViewScanReportsForDoctors = () => {
  const [selectedPatient, setSelectedPatient] = useState(staticPatients[0]); // Default patient

  const [doctorNotes, setDoctorNotes] = useState("");

  const handleSaveNotes = () => {
    alert(`Notes for ${selectedPatient.name} saved successfully.`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-50 p-4 shadow-lg">
        <h2 className="text-lg font-bold text-black flex items-center gap-2">
          <FiFileText size={20} />
          Assigned Scans
        </h2>
        <ul className="mt-4 space-y-4">
          {staticPatients.map((patient) => (
            <li
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
                selectedPatient.id === patient.id
                  ? "bg-white text-black shadow-md"
                  : "bg-blue-100 text-black hover:bg-blue-200"
              }`}
            >
              <FiUser size={20} />
              <div>
                <h3 className="text-md font-semibold">{patient.name}</h3>
                <p className="text-sm">
                  <strong>Condition:</strong> {patient.condition}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Middle Content */}
      <main className="flex-1 p-6">
        <header className="bg-white p-4 rounded shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-black">
              Patient: {selectedPatient.name}
            </h1>
            <p>
              <strong>Condition:</strong>{" "}
              <span
                className={`${
                  selectedPatient.condition === "Critical"
                    ? "text-red-600"
                    : "text-green-600"
                } font-semibold`}
              >
                {selectedPatient.condition}
              </span>
            </p>
          </div>
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


          {/* AI Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-black">AI Analysis</h2>
            <img
              src={selectedPatient.aiSegmentedImage}
              alt={`${selectedPatient.name}'s AI Segmentation`}
              className="mt-4 w-full rounded shadow"
            />
            <p className="mt-4 text-black">{selectedPatient.aiAnalysis}</p>
          </div>
        </div>
      </main>
      {/* Doctor's Notes */}
      <aside className="w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-lg font-bold text-black flex items-center gap-2">
          <FiFileText size={20} />
          Doctor's Notes
        </h2>
        <textarea
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
          rows="6"
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder={`Write your observations for ${selectedPatient.name} here...`}
        ></textarea>
        <div className="mt-4 flex justify-between items-center space-x-4">
          <button
            onClick={handleSaveNotes}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiSave />
            Save Notes
          </button>
          <a
            href={`#`}
            download={selectedPatient.report}
            className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <FiDownload />
            Download Report
          </a>
        </div>
      </aside>
    </div>
  );
};

export default ViewScanReportsForDoctors;
