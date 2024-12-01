import React, { useState } from "react";

const LabTechnicianUploadScans = () => {
  const [uploadedScans] = useState([
    { patient: "John Doe", scanType: "X-Ray", date: "2024-11-25", file: "xray1.jpg" },
    { patient: "Jane Smith", scanType: "MRI", date: "2024-11-24", file: "mri1.jpg" },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold tracking-wide text-center">Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow p-6">
        {/* Upload Scan Form */}
        <section className="w-2/3 bg-white p-6 rounded-lg shadow-md mr-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload a New Scan</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Patient Name</label>
              <input
                type="text"
                placeholder="Enter patient name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Scan Type</label>
              <input
                type="text"
                placeholder="Enter scan type (e.g., X-Ray)"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Scan Date</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Scan File</label>
              <input
                type="file"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
            >
              Upload Scan
            </button>
          </form>
        </section>

        {/* Uploaded Scans Section */}
        <section className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Scans</h2>
          <ul className="space-y-4">
            {uploadedScans.map((scan, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{scan.patient}</p>
                  <p className="text-sm text-gray-600">
                    {scan.scanType} - {scan.date}
                  </p>
                </div>
                <p className="text-indigo-500 text-sm font-medium">{scan.file}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center p-4 mt-auto border-t">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LabTechnicianUploadScans;
