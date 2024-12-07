import React, { useState, useEffect } from "react";
import { getAllPatients } from "../../../services/PatientService";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const DoctorsDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [patients, setPatients] = useState([]);


  const handleProfileClick = () => {
    navigate("/doctor_dashboard/profile", { state: { user } });
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await getAllPatients();
        // Filter for patients with incomplete scans
        const completedScans = patientData.data
          .map((patient) => ({
            _id: patient._id,
            name: patient.name,
            assignedScans: patient.mriScans.filter(
              (scan) => 
                scan.status === "Completed" && 
                scan.requestedBy === user.id && // Match userId for the "requestedBy" field
                (!scan.diagnosis || !scan.report) // Filter for scans with missing diagnosis or report
            ),
          }))
          .filter((patient) => patient.assignedScans.length > 0); // Only include patients with scans to display
      
        setPatients(completedScans); // Update the state with filtered patient data
        console.log('completed',completedScans)
      
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
      
    }      
    fetchPatients();
  }, [user]);

  if (patients.length === 0) {
    return <p>No assigned scans available...</p>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Fixed) */}
      <aside className="w-64 bg-blue-100 shadow-lg fixed h-full">
        <div className="h-16 flex items-center justify-center font-serif italic text-blue-500 text-2xl tracking-wide border-b">
          DiagnoSoftAI
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/doctor_dashboard/patients_results"
                state={{ user }}
                className="block px-4 py-2 bg-blue-200 text-black font-semibold rounded-lg hover:bg-blue-200 hover:scale-105 transform transition"
              >
                <i className="fas fa-user mr-3"></i> Patients
              </Link>
            </li>
            <li>
              <Link
                to="/doctor_dashboard/appointments"
                state={{ user }}
                className="block px-4 py-2 bg-blue-200 text-black font-semibold rounded-lg hover:bg-blue-200 hover:scale-105 transform transition"
              >
                <i className="fas fa-user mr-3"></i> Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/doctor_dashboard/view_scans"
                state={{ user }}
                className="block px-4 py-2 bg-blue-200 text-black font-semibold rounded-lg hover:bg-blue-200 hover:scale-105 transform transition"
              >
                <i className="fas fa-file-medical-alt mr-3"></i> View Scan Reports
              </Link>
            </li>
            <li>
              <Link
                to="/doctor_dashboard/medical_image_analysis"
                state={{ user }}
                className="block px-4 py-2 bg-blue-200 text-black font-semibold rounded-lg hover:bg-blue-200 hover:scale-105 transform transition"
              >
                <i className="fas fa-file-medical-alt mr-3"></i> Medical Image Analysis
              </Link>
            </li>
            <li>
              <Link
                to="/doctor_dashboard/ai_assistant"
                className="block px-4 py-2 bg-blue-200 text-black font-semibold rounded-lg hover:bg-blue-200 hover:scale-105 transform transition"
              >
                <i className="fas fa-robot mr-3"></i> AI chat assistant
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-300 px-6 shadow-sm">
          <div className="text-xl font-semibold text-gray-800">Welcome, Doctor!</div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-blue-500">
              <i className="fas fa-bell text-lg"></i>
            </button>
            {/* Profile Button */}
            <div
              className="flex items-center cursor-pointer"
              onClick={handleProfileClick}
            >
              <FaUserCircle className="text-3xl text-gray-800 mr-2" />
              <span className="hidden sm:block text-gray-700 font-medium">
                Profile
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-grow p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          </div>

          {/* Detailed View */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Assigned Scans</h2>
            <table className="w-full mt-4 p-2 bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="text-left px-4 py-2">Patient</th>
                  <th className="text-left px-4 py-2">Scan Type</th>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-center px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients
                  .map((patient) =>
                    patient.assignedScans.map((scan, index) => {
                      if (!scan.diagnosis || !scan.report) {
                        return (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-gray-50" : ""
                            } hover:bg-blue-50 transition`}
                          >
                            <td className="px-4 py-2">{patient.name}</td>
                            <td className="px-4 py-2">  {scan.scanType}                          
                            </td>
                            <td className="px-4 py-2">{formatDate(scan.uploadDate)}</td>
                            <td
                              className={`px-4 py-2 p-2 text-center font-semibold rounded-full ${
                                !scan.diagnosis
                                  ? "text-yellow-700 bg-yellow-100"
                                  : ""
                              }`}
                            >
                              Pending
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button
                                className="text-blue-500 hover:underline"
                                onClick={() =>
                                  navigate("/doctor_dashboard/view_scans", {
                                    state: { user, scanId: scan._id },
                                  })
                                }
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })
                  )}
              </tbody>
            </table>
          </div>

        </main>
      </div>

      
    </div>
  );
};

export default DoctorsDashboard;
