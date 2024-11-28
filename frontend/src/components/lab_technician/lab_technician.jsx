import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const LabTechnicianDashboard = () => {
  // Static Data
  const pendingScans = [
    { patient: "John Smith", scanType: "MRI", date: "20th Nov", time: "3:00 PM" },
    { patient: "Alice Johnson", scanType: "CT", date: "25th Nov", time: "11:00 AM" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-800 text-white p-4">
        <h1 className="text-3xl font-bold">Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow bg-gray-100">
        {/* Sidebar (1/4 Section) */}
        <aside className="w-1/4 bg-yellow-800 text-white p-6">
          <nav>
            <ul className="space-y-6">
              <li>
                <Link
                  to="/lab_technician/upload_scans" // Redirect to Upload Scans Page
                  className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600 hover:scale-105 transform transition shadow-md"
                >
                  Upload Scans
                </Link>
              </li>
              <li>
                <Link
                  to="/lab_technician/emergency_scans" // Redirect to Emergency Scans Page
                  className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600 hover:scale-105 transform transition shadow-md"
                >
                  Emergency Scans
                </Link>
              </li>
              <li>
                <Link
                  to="/lab_technician/labtechnician_chat" // Redirect to Lab Technician Chat Page
                  className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600 hover:scale-105 transform transition shadow-md"
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
            <h2 className="text-2xl font-semibold mb-4">Welcome, Lab Technician!</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <p className="text-gray-700">
                "Effortlessly upload, and manage scans, while empowering fast, AI-driven care for patients in need."
              </p>
            </div>
          </section>

          {/* Pending Scans Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Pending Scans</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <ul>
                {pendingScans.map((scan, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2 mb-2"
                  >
                    <div>
                      <p className="font-semibold">{scan.patient}</p>
                      <p className="text-sm text-gray-600">
                        {scan.scanType} - {scan.date} at {scan.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-800 text-white text-center p-4">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LabTechnicianDashboard;
