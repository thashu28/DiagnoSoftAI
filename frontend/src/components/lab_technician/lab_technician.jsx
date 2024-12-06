import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { getAllPatients } from "../../../services/PatientService";

const LabTechnicianDashboard = () => {
  // State for patients
  const [patients, setPatients] = useState([]);

  // Fetch patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 shadow-lg flex items-center justify-between">
        {/* Website Name */}
        <div className="font-serif italic text-blue-500 text-2xl tracking-wide">
          DiagnoSoftAI
        </div>
        {/* Lab Technician Dashboard Title */}
        <h1 className="text-2xl font-bold" style={{ marginRight: "30rem" }}>Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar (1/4 Section) */}
        <aside className="w-1/4 bg-gray-200 p-6 shadow-md">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/lab_technician/emergency_scans" // Redirect to Emergency Scans Page
                  className="block w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Emergency Scans
                </Link>
              </li>

              <li>
                <Link
                  to="/lab_technician/upload_scans" // Redirect to Upload Scans Page
                  className="block w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Upload Scans
                </Link>
              </li>
              
              <li>
                <Link
                  to="/lab_technician/test_reports" // Redirect to Emergency Scans Page
                  className="block w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Upload Test Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/lab_technician/labtechnician_chat" // Redirect to Lab Technician Chat Page
                  className="block w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Chat
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="w-3/4 p-6">
          {/* Welcome Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome, Lab Technician!
            </h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <p className="text-gray-700 text-lg">
                "Effortlessly upload, and manage scans, while empowering fast, AI-driven care
                for patients in need."
              </p>
            </div>
          </section>

          {/* Pending Scans Section */}
          <section className="w-full bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Scans</h2>
            <ul className="space-y-3">
              {patients.map((patient, index) => {
                // Filter only pending MRI scans
                const pendingScans = patient.mriScans.filter(scan => scan.status === "Pending");

                return pendingScans.length > 0 ? (
                  pendingScans.map((pendingScan, subIndex) => (
                    <li key={`${index}-${subIndex}`} className="p-3 border rounded-lg bg-gray-50 shadow-sm flex justify-between">
                      <div className="w-3/4">
                        <p className="font-medium text-gray-700">{patient.name}</p>
                        <p className="text-sm text-gray-600">{pendingScan.scanType}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(pendingScan.uploadDate).toLocaleString()}
                        </p>
                      </div>

                      {/* Upload Scan Button aligned to the right */}
                      <div className="w-1/4 flex justify-end items-center">
                        <Link
                          to="/lab_technician/upload_scans" // Navigate to the Upload Scans Page
                          className="inline-block px-6 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md transition"
                        >
                          Upload Scan
                        </Link>
                      </div>
                    </li>
                  ))
                ) : null; // If no pending scans, return nothing for this patient
              })}
            </ul>
          </section>
           
           {/* Pending Test Reports Section */}
        <section className="w-full bg-white p-6 pt-2 rounded-lg shadow-md overflow-y-auto max-h-screen">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Test Reports</h2>
          <ul className="space-y-3">
            {patients.map((patient, index) => {
              // Filter only pending test reports
              const pendingReports = patient.testReports.filter(report => report.status === "Pending");

              return pendingReports.length > 0 ? (
                pendingReports.map((pendingReport, subIndex) => (
                  <li key={`${index}-${subIndex}`} className="p-3 border rounded-lg bg-gray-50 shadow-sm flex justify-between">
                    <div className="w-3/4">
                      <p className="font-medium text-gray-700">{patient.name}</p>
                      <p className="text-sm text-gray-600">{pendingReport.testType}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(pendingReport.uploadDate).toLocaleString()}
                      </p>
                    </div>

                    {/* Upload Test Report Button aligned to the right */}
                    <div className="w-1/4 flex justify-end items-center">
                      <Link
                        to="/lab_technician/upload_reports" // Navigate to the Upload Test Reports Page
                        className="inline-block px-6 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md transition"
                      >
                        Upload Report
                      </Link>
                    </div>
                  </li>
                ))
              ) : null; // If no pending reports, return nothing for this patient
            })}
          </ul>
        </section>

          
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center p-4 mt-auto border-t">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LabTechnicianDashboard;
