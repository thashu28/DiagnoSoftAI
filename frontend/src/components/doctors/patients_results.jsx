import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { getAllPatients, getPatientById } from "../../../services/PatientService";

const PatientResults = () => {
  const [patientsResults, setPatientsResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientReports, setSelectedPatientReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        setPatientsResults(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Fetch reports for the selected patient
  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setLoadingReports(true);
    try {
      const response = await getPatientById(patient._id);
      setSelectedPatientReports(response.data.testReports || []);
    } catch (err) {
      console.error("Error fetching patient reports:", err);
      setSelectedPatientReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  // Filter patients based on search query
  const filteredPatients = patientsResults.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patients by name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading patient data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Results Table */}
      {!loading && !error && (
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
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr
                    key={patient._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-4">{patient.name}</td>
                    <td className="p-4">{patient.age}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          patient.appointments.some(
                            (appt) => appt.condition === "Critical"
                          )
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {patient.appointments.some(
                          (appt) => appt.condition === "Critical"
                        )
                          ? "Critical"
                          : "Stable"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleSelectPatient(patient)}
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 p-4">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed View */}
      {selectedPatient && (
        <div className="mt-6 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedPatient.name}'s Details
          </h2>

          {/* Patient Basic Info */}
          <div className="flex space-x-6">
            <p className="text-lg text-gray-700">
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Condition:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedPatient.appointments.some(
                    (appt) => appt.condition === "Critical"
                  )
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {selectedPatient.appointments.some(
                  (appt) => appt.condition === "Critical"
                )
                  ? "Critical"
                  : "Stable"}
              </span>
            </p>
          </div>

          {/* Test Reports */}
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Test Reports</h3>
          {loadingReports ? (
            <p>Loading test reports...</p>
          ) : selectedPatientReports.length > 0 ? (
            <ul className="space-y-4">
              {selectedPatientReports.map((report, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-white p-4 rounded-lg shadow-md"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {report.testType}
                    </p>
                    <p className="text-gray-600">{report.description}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-500 mr-4">
                      {new Date(report.uploadDate).toLocaleDateString()}
                    </p>
                    {report.fileUrl && (
                      <a
                        href={report.fileUrl}
                        download
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
                      >
                        <FiDownload className="mr-2" />
                        Download
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reports available for this patient.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientResults;
