import React from "react";

const ViewReports = () => {
  // Static Data for demonstration
  const reports = [
    {
      serial: 1,
      date: "18th Nov 2024",
      doctor: "Dr. Sarah Lee",
      department: "Cardiology",
      link: "/reports/blood-test.pdf", // Example link
    },
    {
      serial: 2,
      date: "15th Nov 2024",
      doctor: "Dr. John Doe",
      department: "Radiology",
      link: "/reports/x-ray.pdf", // Example link
    },
    {
      serial: 3,
      date: "10th Nov 2024",
      doctor: "Dr. Emma Brown",
      department: "Neurology",
      link: "/reports/mri.pdf", // Example link
    },
  ];

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
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">Serial: {report.serial}</p>
                <p>Date of Visit: {report.date}</p>
                <p>Doctor Visited: {report.doctor}</p>
                <p>Department: {report.department}</p>
              </div>
              <div>
                <a
                  href={report.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400"
                >
                  Download Report
                </a>
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
