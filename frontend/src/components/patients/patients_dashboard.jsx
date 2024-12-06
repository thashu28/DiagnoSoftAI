import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getPatientById } from "../../../services/PatientService";
import { FaUserCircle } from "react-icons/fa"; // Import the desired icon

const PatientDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        if (user?.id) {
          const response = await getPatientById(user.id);
          setUpcomingAppointments(response.data.appointments || []);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointmentDetails();
  }, [user]);

  const handleProfileClick = () => {
    navigate("/patients_dashboard/profile", { state: { user } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 shadow-lg flex items-center justify-between">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        {/* Profile Icon for logging In*/}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          <FaUserCircle className="text-4xl text-white mr-2" /> {/* Icon added */}
          <span className="hidden sm:block text-white text-sm font-semibold">
            Profile
          </span>
        </div>

      </header>

      {/* Main Content */}
      <div className="flex flex-grow bg-gray-100">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gradient-to-b from-gray-800 to-gray-600 text-white p-6">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/patients_dashboard/schedule_appointments"
                  state={{ user }}
                  className="block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 hover:scale-105 transform transition"
                >
                  Schedule Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/patients_dashboard/view_scans"
                  state={{ user }}
                  className="block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 hover:scale-105 transform transition"
                >
                  View Scans
                </Link>
              </li>
              <li>
                <Link
                  to="/patients_dashboard/view_reports"
                  state={{ user }}
                  className="block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 hover:scale-105 transform transition"
                >
                  View Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/patients_dashboard/patient_chat"
                  className="block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 hover:scale-105 transform transition"
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
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome, Patient!
              </h2>
              <p className="text-gray-700">
                Access your appointments, medical scans, reports, and chat with
                healthcare providers in one place.
              </p>
            </div>
          </section>

          {/* Upcoming Appointments Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {upcomingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="p-4 border rounded-lg shadow hover:shadow-lg transition"
                    >
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        Doctor: {appointment.doctor}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <strong>Date:</strong>{" "}
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <strong>Time:</strong> {appointment.time}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <strong>Condition:</strong>{" "}
                        <span
                          className={`${
                            appointment.condition === "Critical"
                              ? "text-red-500 font-semibold"
                              : "text-green-500 font-semibold"
                          }`}
                        >
                          {appointment.condition}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        <strong>Description:</strong>{" "}
                        {appointment.description || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">
                  No upcoming appointments.
                </p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Diagnosoft AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;
