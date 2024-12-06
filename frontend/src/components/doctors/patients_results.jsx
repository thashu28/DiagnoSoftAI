import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";

// Static data for demonstration
const patientsResults = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    condition: "Critical",
    testResults: [
      { test: "MRI Scan", result: "Glioblastoma detected", date: "2024-11-25" },
      { test: "Blood Test", result: "Normal", date: "2024-11-20" },
    ],
    report: "John_Doe_Report.pdf",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    condition: "Stable",
    testResults: [
      { test: "CT Scan", result: "No significant findings", date: "2024-11-22" },
      { test: "Blood Test", result: "Elevated WBC count", date: "2024-11-18" },
    ],
    report: "Jane_Smith_Report.pdf",
  },
];

const PatientResults = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <header className=" bg-gradient-to-r from-blue-200 via-blue-100 to-gray-100 text-gray-800 p-4 rounded-md shadow-md flex items-center justify-between">
        {/* Website Name */}
        <div className="font-serif italic text-blue-500 text-2xl tracking-wide">
          DiagnoSoftAI
        </div>
        <h1 className="text-3xl font-bold" style={{ marginRight: "30rem" }}>Patient Results</h1>
      </header>

      {/* Results Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Patient Results</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left text-gray-800">
              <th className="p-4 font-medium">Patient</th>
              <th className="p-4 font-medium">Age</th>
              <th className="p-4 font-medium">Condition</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {patientsResults.map((patient, index) => (
              <tr
                key={patient.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
                onClick={() => setSelectedPatient(patient)}
              >
                <td className="p-4">{patient.name}</td>
                <td className="p-4">{patient.age}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      patient.condition === "Critical"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {patient.condition}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed View */}
      {selectedPatient && (
        <div className="mt-6 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedPatient.name}'s Results
            </h2>
            <a
              href={`#`}
              download={selectedPatient.report}
              className="flex items-center px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
            >
              <FiDownload className="mr-2" />
              Download Report
            </a>
          </div>
          <div className="flex space-x-6 mt-4">
            <p className="text-lg text-gray-700">
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Condition:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedPatient.condition === "Critical"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {selectedPatient.condition}
              </span>
            </p>
          </div>

          {/* Test Results */}
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Test Results</h3>
          <ul className="space-y-4">
            {selectedPatient.testResults.map((result, index) => (
              <li
                key={index}
                className="flex justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div>
                  <p className="font-semibold text-gray-800">{result.test}</p>
                  <p className="text-gray-600">{result.result}</p>
                </div>
                <p className="text-gray-500">{result.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientResults;
