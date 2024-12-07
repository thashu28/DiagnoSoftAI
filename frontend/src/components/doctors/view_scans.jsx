import React, { useEffect, useState } from "react";
import { FiDownload, FiSave, FiFileText, FiUser } from "react-icons/fi";
import { getAllPatients, addDiagnosisReport } from "../../../services/PatientService";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const ViewScanReportsForDoctors = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { user } = location.state || {}; 
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedScan, setSelectedScan] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");  // State for diagnosis
  const [report, setReport] = useState("");  // State for report

  // Handle patient selection with multiple scans
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  // Handle scan selection
  const handleScanSelect = (scan) => {
    setSelectedScan(scan);
  };

  // Fetch patient data from the service
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await getAllPatients();
        // Filter for patients with incomplete scans
        const completedScans = patientData.data
          .map((patient) => ({
            _id: patient._id,
            name: patient.name,
            assignedScans: patient.mriScans.filter(
              (scan) => 
                scan.status === "Completed" && 
                scan.requestedBy === user.id && // Match userId for the "requestedBy" field
                (!scan.diagnosis || !scan.report) // Filter for scans with missing diagnosis or report
            ),
          }))
          .filter((patient) => patient.assignedScans.length > 0); // Only include patients with scans to display
      
        setPatients(completedScans); // Update the state with filtered patient data
        if (completedScans.length > 0) {
          setSelectedPatient(completedScans[0]); // Select the first patient in the list
          setSelectedScan(completedScans[0].assignedScans[0]); // Select the first scan for the selected patient
        }
      
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
      
    }      
    fetchPatients();
  }, [user]);

  const handleSaveNotes = async () => {
    if (selectedScan && diagnosis && report) {
      try {
        console.log('diagnosis',diagnosis)
        console.log('report',report)
        const response = await addDiagnosisReport(selectedPatient._id, selectedScan._id, {
          diagnosis: diagnosis,
          report: report,
        });
        console.log('response',response.data)
        alert(`Report for ${selectedPatient.name} on scan ${selectedScan.scanType} saved successfully.`);
      } catch (error) {
        console.error("Error saving diagnosis report:", error);
        alert("Error saving the report. Please try again.");
      }
    } else {
      alert("Please provide both diagnosis and report before saving.");
    }
  };

  if (patients.length === 0) {
    return <p>No assigned scans available...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-50 p-4 shadow-lg">
        <h2 className="text-lg font-bold text-black flex items-center gap-2">
          <FiFileText size={20} />
          Assigned Scans
        </h2>
        <ul className="mt-4 space-y-4">
          {patients.map((patient) => (
            <li
              key={patient._id}
              onClick={() => handlePatientSelect(patient)}  // Handle patient selection
              className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
                selectedPatient?._id === patient._id
                  ? "bg-white text-black shadow-md"
                  : "bg-blue-100 text-black hover:bg-blue-200"
              }`}
            >
              <FiUser size={20} />
              <div>
                <h3 className="text-md font-semibold">{patient.name}</h3>
                <p className="text-sm"><strong>Condition:</strong> Critical</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
  
      {/* Main Content */}
      <main className="flex-1 p-6">
        {selectedPatient && selectedScan && (
          <>
            <header className="bg-white p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-black">
                  Patient: {selectedPatient.name}
                </h1>
                <p><strong>Condition:</strong> <span className="text-red-600 font-semibold">Critical</span></p>
              </div>
            </header>
  
            <div className="mt-6">
              {/* Display list of scans for selected patient */}
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Scan Details</h2>
                <div className="space-y-4">
                  {selectedPatient.assignedScans.map((scan) => (
                    <div key={scan._id} onClick={() => handleScanSelect(scan)} className="cursor-pointer p-4 border rounded-lg hover:bg-gray-100">
                      <p><strong>Scan Type:</strong> {scan.scanType}</p>
                      <p><strong>Priority:</strong> {scan.priority}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Display selected scan details */}
              <div className="mt-6 bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Selected Scan Details</h2>
                <p className="mt-2 text-gray-700"><strong>Scan Type:</strong> {selectedScan.scanType}</p>
                <p className="mt-2 text-gray-700"><strong>Priority:</strong> {selectedScan.priority}</p>
                <p className="mt-2 text-gray-700"><strong>Description:</strong> {selectedScan.description}</p>
                <p className="mt-2 text-gray-700"><strong>Comments:</strong> {selectedScan.comments}</p>
                <div className="mt-4">
                  <a
                    href={selectedScan.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Scan
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
  
      {/* Report Section */}
      <aside className="w-1/4 bg-white shadow-lg p-4">
        {selectedPatient && selectedScan && (
          <>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FiFileText size={20} />
              Report for the selected scan
            </h2>
            <div className="mt-4">
              {/* Diagnosis Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Diagnosis</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}  // Set diagnosis
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter diagnosis here..."
                />
              </div>
  
              {/* Report Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Report</label>
                <textarea
                  value={report}
                  onChange={(e) => setReport(e.target.value)}  // Set report
                  rows="6"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={`Write your report for ${selectedPatient.name} here...`}
                ></textarea>
              </div>
  
              <div className="mt-4 flex justify-between items-center space-x-4">
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FiSave size={18} />
                  Save Report
                </button>
  
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default ViewScanReportsForDoctors;
