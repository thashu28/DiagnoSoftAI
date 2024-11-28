import React, { useState } from "react";

const UploadScans = () => {
  const [newScan, setNewScan] = useState({
    patient: "",
    type: "",
    date: "",
    file: null,
  });

  const [uploadedScans, setUploadedScans] = useState([
    { patient: "John Doe", type: "X-Ray", date: "2024-11-25", fileName: "xray1.jpg" },
    { patient: "Jane Smith", type: "MRI", date: "2024-11-24", fileName: "mri1.jpg" },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewScan({ ...newScan, file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewScan({ ...newScan, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newScan.patient && newScan.type && newScan.date && newScan.file) {
      // Add the new scan to the uploaded scans list
      setUploadedScans([
        ...uploadedScans,
        { ...newScan, fileName: newScan.file.name },
      ]);
      alert("Scan uploaded successfully!");
      // Reset the form
      setNewScan({ patient: "", type: "", date: "", file: null });
    } else {
      alert("Please fill all fields and upload a scan file.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-800 text-white p-4">
        <h1 className="text-3xl font-bold">Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow bg-gray-100">
        {/* Left Block: Upload Scan Form */}
        <div className="w-1/2 p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Upload a New Scan</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
              <div className="mb-4">
                <label htmlFor="patient" className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patient"
                  name="patient"
                  value={newScan.patient}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Scan Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={newScan.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Scan Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newScan.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Scan File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                {newScan.file && (
                  <p className="text-sm text-green-500 mt-2">Selected File: {newScan.file.name}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-500"
              >
                Upload Scan
              </button>
            </form>
          </section>
        </div>

        {/* Right Block: List of Uploaded Scans */}
        <div className="w-1/2 p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Uploaded Scans</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
              {uploadedScans.length > 0 ? (
                <ul className="space-y-4">
                  {uploadedScans.map((scan, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">{scan.patient}</p>
                        <p className="text-sm text-gray-600">
                          {scan.type} - {scan.date}
                        </p>
                      </div>
                      <span className="text-gray-800">{scan.fileName}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No scans uploaded yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-800 text-white text-center p-4">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UploadScans;
