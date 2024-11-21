import React from "react";
import { Link } from "react-router-dom";

const LabTechnicianDashboard = () => {
  // Static Data
  const pendingScans = [
    { patientName: "John Doe", scanType: "MRI", dueDate: "20th Nov" },
    { patientName: "Jane Smith", scanType: "CT Scan", dueDate: "22nd Nov" },
  ];

  const recentUploads = [
    { patientName: "Alice Johnson", scanType: "X-Ray", uploadedOn: "18th Nov" },
    { patientName: "Bob Brown", scanType: "Ultrasound", uploadedOn: "15th Nov" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Lab Technician Dashboard</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button className="text-white hover:underline">Logout</button>
              </li>
              <li>
                <button className="text-white hover:underline">Profile</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (1/4 Section) */}
        <aside className="w-1/4 bg-green-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-8">Quick Action</h2>
          <nav>
            <ul className="space-y-6">
              <li>
                <button className="w-full text-left px-4 py-2 bg-green-700 rounded-lg hover:bg-green-600">
                  Upload Scan
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 bg-green-700 rounded-lg hover:bg-green-600">
                  Emergency Scans
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 bg-green-700 rounded-lg hover:bg-green-600">
                  Patient Results
                </button>
              </li>
              <li>
                <Link to='/chatbot' className="w-full text-left px-4 py-2 bg-green-700 rounded-lg hover:bg-green-600">
                  Chatbot
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content (3/4 Section) */}
        <main className="w-3/4 p-6">
          {/* Welcome Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome, Lab Technician</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <p className="text-gray-700">
                Manage patient scans, communicate with doctors and patients, and
                keep track of recent uploads efficiently.
              </p>
            </div>
          </section>

          {/* Upload Scan Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upload Scans</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <p className="text-gray-700">
                Upload medical scans for patients assigned to you.
              </p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
                Upload Now
              </button>
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
                      <p className="font-semibold">{scan.patientName}</p>
                      <p className="text-sm text-gray-600">
                        {scan.scanType} - Due: {scan.dueDate}
                      </p>
                    </div>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-400">
                      Upload
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Recent Uploads Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Uploads</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <ul>
                {recentUploads.map((upload, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2 mb-2"
                  >
                    <div>
                      <p className="font-semibold">{upload.patientName}</p>
                      <p className="text-sm text-gray-600">
                        {upload.scanType} - Uploaded: {upload.uploadedOn}
                      </p>
                    </div>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-400">
                      View
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Chatbot Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Chatbot</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <p className="text-gray-700">
                Communicate with doctors or patients for any clarifications.
              </p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
                Open Chatbot
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white text-center p-4">
        <p>&copy; 2024 Lab Technician Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LabTechnicianDashboard;
