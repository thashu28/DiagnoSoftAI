import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const PatientDashboard = () => {
  // Static Data
  const upcomingAppointments = [
    { doctor: "Dr. Sarah Lee", date: "20th Nov", time: "2:00 PM" },
    { doctor: "Dr. John Doe", date: "25th Nov", time: "10:00 AM" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-800 text-white p-4">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow bg-gray-100">
        {/* Sidebar (1/4 Section) */}
        <aside className="w-1/4 bg-yellow-800 text-white p-6">
          <nav>
            <ul className="space-y-6">
              <li>
                <Link
                  to="/patients_dashboard/schedule_appointments" // Redirect to Schedule Appointments Page
                  className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600"
                >
                  Schedule Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/patients_dashboard/view_scans" // Redirect to View Scans Page
                  className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600"
                >
                  View Scans
                </Link>
              </li>
              <li>
                <Link
                  to="/patients_dashboard/view_reports"
                  className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600"
                >
                  View Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/patients_dashboard/patient_chat"
                  className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600"
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
            <h2 className="text-2xl font-semibold mb-4">Welcome, Patient !</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <p className="text-gray-700">
                Access your appointments, medical scans, reports, and chat with
                healthcare providers in one place.
              </p>
            </div>
          </section>

          {/* Upcoming Appointments Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <ul>
                {upcomingAppointments.map((appointment, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2 mb-2"
                  >
                    <div>
                      <p className="font-semibold">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400">
                      Reschedule
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-800 text-white text-center p-4">
        <p>&copy; 2024 Diagnosoft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;
