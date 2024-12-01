import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const LabTechnicianDashboard = () => {
  // Static Data
  const pendingScans = [
    { patient: "John Smith", scanType: "MRI", date: "20th Nov", time: "3:00 PM" },
    { patient: "Alice Johnson", scanType: "CT", date: "25th Nov", time: "11:00 AM" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold tracking-wide">Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar (1/4 Section) */}
        <aside className="w-1/4 bg-gray-200 p-6 shadow-md">
          <nav>
            <ul className="space-y-4">
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
                  to="/lab_technician/emergency_scans" // Redirect to Emergency Scans Page
                  className="block w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Emergency Scans
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
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Scans</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <ul>
                {pendingScans.map((scan, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{scan.patient}</p>
                      <p className="text-sm text-gray-500">
                        {scan.scanType} - {scan.date} at {scan.time}
                      </p>
                    </div>
                    <Link
                      to="/lab_technician/upload_scans"
                      className="text-purple-500 font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
