import React, { useEffect, useState } from "react";

// This is where you would normally fetch the reports from the backend (e.g., using axios or fetch).
const fetchReports = async () => {
  // Simulating fetched data from the backend (you can replace this with an actual API call)
  return [
    {
      serial: 1,
      testType: "Blood Test",
      fileUrl: "/reports/blood-test.pdf",
      description: "Blood test to check cholesterol levels.",
      requestedBy: "Dr. Sarah Lee",
      uploadDate: "2024-11-18",
      status: "Completed",
      comments: "Test completed successfully.",
    },
    {
      serial: 2,
      testType: "Cholesterol Test",
      fileUrl: "",
      description: "Test to measure cholesterol levels.",
      requestedBy: "Dr. John Doe",
      uploadDate: "2024-11-15",
      status: "Pending",
      comments: "Pending lab results.",
    },
    {
      serial: 3,
      testType: "Urine Test",
      fileUrl: "/reports/urine-test.pdf",
      description: "Urine test for general health checkup.",
      requestedBy: "Dr. Emma Brown",
      uploadDate: "2024-11-10",
      status: "Completed",
      comments: "Test completed, no issues found.",
    },
  ];
};

const ViewReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      const data = await fetchReports(); // Fetching the reports
      setReports(data);
    };

    getReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-yellow-800 text-white p-4">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-6">View Reports</h2>
        <div className="grid gap-6">
          {reports.map((report) => (
            <div
              key={report.serial}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start"
            >
              <div className="flex flex-col">
                <p className="font-bold">Test Type: {report.testType}</p>
                <p>Description: {report.description}</p>
                <p>Requested By: {report.requestedBy}</p>
                <p>Upload Date: {new Date(report.uploadDate).toLocaleDateString()}</p>
                <p>Comments: {report.comments}</p>
              </div>
              <div className="flex flex-col justify-between">
                {/* Conditional rendering based on report status */}
                {report.status === "Completed" ? (
                  <a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400"
                  >
                    Download Report
                  </a>
                ) : (
                  <span className="text-red-500 font-bold">Pending</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-yellow-800 text-white text-center p-4">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewReports;
