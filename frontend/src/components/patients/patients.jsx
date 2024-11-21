import React from "react";

const PatientDashboard = () => {
  // Static Data
  const upcomingAppointments = [
    { doctor: "Dr. Sarah Lee", date: "20th Nov", time: "2:00 PM" },
    { doctor: "Dr. John Doe", date: "25th Nov", time: "10:00 AM" },
  ];

  const recentReports = [
    { title: "Blood Test Report", date: "18th Nov" },
    { title: "X-Ray Scan Report", date: "15th Nov" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (1/4 Section) */}
      <aside className="w-1/4 bg-yellow-800 text-white p-6">
        <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>
        
        {/* Quick Links */}
        <nav>
          <ul className="space-y-6">
            <li>
              <button className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600">
                Schedule Appointment
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600">
                View Scans
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600">
                View Reports
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-600">
                Open Chatbot
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content (3/4 Section) */}
      <main className="w-3/4 p-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome, Patient</h2>
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

        {/* Medical Scans Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Scans</h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="text-gray-700">
              Access and download your previous medical scans.
            </p>
            <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400">
              View Scans
            </button>
          </div>
        </section>

        {/* Recent Reports Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Reports</h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <ul>
              {recentReports.map((report, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2 mb-2"
                >
                  <div>
                    <p className="font-semibold">{report.title}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400">
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chatbot Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Chatbot</h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="text-gray-700">
              Chat with your healthcare provider for instant assistance.
            </p>
            <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400">
              Open Chatbot
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
