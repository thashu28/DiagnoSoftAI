import React, { useState } from "react";

const EmergencyScans = () => {
  const [newEmergencyScan, setNewEmergencyScan] = useState({
    patient: "",
    type: "",
    date: "",
    file: null,
    priority: "High", // Default priority for emergency scans
  });

  const [emergencyScans, setEmergencyScans] = useState([
    // Example list of emergency scans
    { patient: "John Doe", type: "CT Scan", date: "2024-11-25", fileName: "ctscan1.jpg", status: "In Progress" },
    { patient: "Jane Smith", type: "X-Ray", date: "2024-11-24", fileName: "xray2.jpg", status: "Resolved" },
  ]);

  const handleFileChange = (e) => {
    setNewEmergencyScan({ ...newEmergencyScan, file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmergencyScan({ ...newEmergencyScan, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEmergencyScan.patient && newEmergencyScan.type && newEmergencyScan.date && newEmergencyScan.file) {
      setEmergencyScans([
        ...emergencyScans,
        { ...newEmergencyScan, fileName: newEmergencyScan.file.name, status: "Pending" },
      ]);
      alert("Emergency Scan uploaded successfully!");
      setNewEmergencyScan({ patient: "", type: "", date: "", file: null, priority: "High" });
    } else {
      alert("Please fill all fields and upload a scan file.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-800 text-white p-4">
        <h1 className="text-3xl font-bold">Lab Technician Dashboard</h1>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-grow p-6">
        {/* Left Block: Upload Emergency Scan Form */}
        <div className="w-full md:w-1/2 p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Upload Emergency Scan</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
              <div className="mb-4">
                <label htmlFor="patient" className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patient"
                  name="patient"
                  value={newEmergencyScan.patient}
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
                  value={newEmergencyScan.type}
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
                  value={newEmergencyScan.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Scan File
                </label>
                <div className="flex items-center justify-center border-2 border-dashed border-yellow-500 p-4 rounded-lg hover:bg-yellow-50 transition cursor-pointer">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <p className="text-gray-600">Drag & drop or click to upload</p>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newEmergencyScan.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-500"
              >
                Upload Emergency Scan
              </button>
            </form>
          </section>
        </div>

        {/* Right Block: Display Uploaded Emergency Scans */}
        <div className="w-1/2 p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Uploaded Emergency Scans</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
              {emergencyScans.length > 0 ? (
                <ul className="space-y-4">
                  {emergencyScans.map((scan, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">{scan.patient}</p>
                        <p className="text-sm text-gray-600">{scan.type} - {scan.date}</p>
                      </div>
                      <a href={`/uploads/${scan.fileName}`} className="text-blue-500 hover:underline">
                        {scan.fileName}
                      </a>
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

export default EmergencyScans;
