import React, { useState, useEffect } from "react";
import { getPatientById } from "../../../services/PatientService";
import { useLocation } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { ImSpinner3 } from "react-icons/im";

const ViewReports = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [reports, setReports] = useState([]);

  // Fetch patient reports
  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        if (user?.id) {
          const response = await getPatientById(user.id);
          setReports(response.data.testReports || []);
        }
      } catch (error) {
        console.error("Error fetching Reports:", error);
      }
    };

    fetchReportDetails();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 shadow-md">
        <h1 className="text-4xl font-extrabold text-center">Patient Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Medical Reports
        </h2>

        {reports.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 transition-transform transform hover:scale-105"
              >
                {/* Report Details */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                    {report.testType}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Description:</strong> {report.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Requested By:</strong> {report.requestedBy}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Upload Date:</strong>{" "}
                    {new Date(report.uploadDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-bold ${
                        report.status === "Completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.status}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4">
                  {report.status === "Completed" ? (
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition"
                    >
                      <FiDownload className="mr-2" />
                      Download PDF
                    </a>
                  ) : (
                    <div className="flex items-center justify-center text-red-500 font-semibold">
                      <ImSpinner3 className="animate-spin mr-2" />
                      Report Pending
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-16">
            No reports available at the moment.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewReports;
