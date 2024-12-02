import React, { useState, useEffect } from "react";
import { getAllPatients } from "../../../services/PatientService";
import { addTestReport } from "../../../services/PatientService";
const LabTechniciansTestReports = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    testType: "",
    date: "",
    fileUrl: "",
    description: "",
    comments: "",
    priority: "normal", // default value
  });

  const [message, setMessage] = useState(""); // To show success or error messages
  const testTypes = [
    "Blood Test",
    "Cholesterol Test",
    "Urine Test",
    "Glucose Test",
    "Other",
  ]; // Test types from the schema

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const testReportData = {
        testType: formData.testType,
        fileUrl: formData.fileUrl,
        description: formData.description,
        requestedBy: formData.patientId, // Assuming the patient ID is used for `requestedBy`
        uploadDate: new Date().toISOString(), // Set uploadDate as the current timestamp
        priority: formData.priority,
        status: "Completed", // Default status is pending when uploaded
        comments: formData.comments,
      };

      console.log(testReportData);
      await addTestReport(formData.patientId, testReportData); // Call API to upload report
      setMessage("Test report uploaded successfully!");
      setFormData({
        patientId: "",
        testType: "",
        date: "",
        fileUrl: "",
        description: "",
        comments: "",
        priority: "normal", // reset to default
      }); // Reset form
    } catch (error) {
      setMessage(error.message || "Failed to upload test report.");
      console.error("Error uploading test report:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold tracking-wide text-center">Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow p-6">
        {/* Upload Test Report Form */}
        <section className="w-2/3 bg-white p-6 rounded-lg shadow-md mr-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload a New Test Report</h2>
          {message && (
            <div className="p-3 mb-4 text-white bg-green-500 rounded">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Patient</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Test Type</label>
              <select
                name="testType"
                value={formData.testType}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select a test type</option>
                {testTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Test Report File URL</label>
              <input
                type="url"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleInputChange}
                placeholder="Enter file URL"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter test report description"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Comments</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Enter comments"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
            >
              Upload Test Report
            </button>
          </form>
        </section>

        {/* Uploaded Test Reports Section */}
        {/* Uploaded Test Reports Section */}
        <section className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Test Reports</h2>
        <ul className="space-y-3">
            {patients.map((patient, index) => {
            // Filter only completed test reports
            const completedReports = patient.testReports.filter(report => report.status === "Completed");

            return completedReports.length > 0 ? (
                completedReports.map((completedReport, subIndex) => (
                <li key={`${index}-${subIndex}`} className="p-3 border rounded-lg bg-gray-50 shadow-sm">
                    <p className="font-medium text-gray-700">{patient.name}</p>
                    <p className="text-sm text-gray-600">{completedReport.testType}</p>
                    <p className="text-sm text-gray-500">
                    {new Date(completedReport.uploadDate).toLocaleString()}
                    </p>
                    <a href={completedReport.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-500">
                    View Report
                    </a>
                </li>
                ))
            ) : null; // If no completed reports, return nothing for this patient
            })}
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

export default LabTechniciansTestReports;

