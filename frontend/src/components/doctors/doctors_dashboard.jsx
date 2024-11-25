import React, { useState } from "react";
import { Link } from "react-router-dom";

const DoctorsDashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100">
<<<<<<< Updated upstream
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
=======
      {/* Sidebar (Fixed) */}
      <aside className="w-64 bg-white shadow-lg fixed h-full">
>>>>>>> Stashed changes
        <div className="h-16 flex items-center justify-center font-bold text-blue-500 text-xl border-b">
          DiagnoSoftAI
        </div>
        <nav className="mt-4">
<<<<<<< Updated upstream
        <ul className="space-y-2">
          <li>
            <Link
              to="/patients"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              to="/doctor_dashboard/appointments"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Appointments
            </Link>
          </li>
          <li>
            <Link
              to="/doctor_dashboard/chatbot"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              Messages
            </Link>
          </li>
          <li>
            <Link
              to="/doctor_dashboard/view_scans"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              View Scan Reports
            </Link>
          </li>
        </ul>

=======
          <ul className="space-y-2">
            <li>
              <Link
                to="/doctor_dashboard/patients_results"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                <i className="fas fa-user mr-3"></i> Patients
              </Link>
            </li>
            <li>
              <Link
                to="/doctor_dashboard/appointments"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                <i className="fas fa-calendar-alt mr-3"></i> Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/doctor_dashboard/chatbot"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                <i className="fas fa-envelope mr-3"></i> Messages
              </Link>
            </li>
            <li>
              <Link
                to="/doctor_dashboard/view_scans"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                <i className="fas fa-file-medical-alt mr-3"></i> View Scan Reports
              </Link>
            </li>
          </ul>
>>>>>>> Stashed changes
        </nav>
      </aside>

      {/* Main Content */}
<<<<<<< Updated upstream
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between bg-white px-6 shadow-sm">
          <div className="text-lg font-semibold text-gray-700">Welcome, Doctor!</div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-500">
              <i className="fas fa-bell"></i>
=======
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between bg-white px-6 shadow-sm">
          <div className="text-xl font-semibold text-gray-800">Welcome, Doctor!</div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-500">
              <i className="fas fa-bell text-lg"></i>
>>>>>>> Stashed changes
            </button>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-grow p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<<<<<<< Updated upstream
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Emergency Cases</h3>
              <p className="text-3xl font-bold text-blue-500 mt-2">5</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Pending Reports</h3>
              <p className="text-3xl font-bold text-blue-500 mt-2">12</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">New Messages</h3>
              <p className="text-3xl font-bold text-blue-500 mt-2">3</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">AI-Analyzed Scans</h3>
              <p className="text-3xl font-bold text-blue-500 mt-2">8</p>
            </div>
=======
            {[
              { title: "Emergency Cases", count: 5, icon: "fas fa-exclamation-triangle" },
              { title: "Pending Reports", count: 12, icon: "fas fa-file-alt" },
              { title: "New Messages", count: 3, icon: "fas fa-envelope" },
              { title: "AI-Analyzed Scans", count: 8, icon: "fas fa-robot" },
            ].map((card, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4 hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <i className={`${card.icon} text-blue-500 text-3xl`}></i>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
                  <p className="text-3xl font-bold text-blue-500 mt-2">{card.count}</p>
                </div>
              </div>
            ))}
>>>>>>> Stashed changes
          </div>

          {/* Detailed View */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Assigned Scans</h2>
            <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
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
<<<<<<< Updated upstream
                <tr>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">CT Scan</td>
                  <td className="px-4 py-2">2024-11-20</td>
                  <td className="px-4 py-2 text-blue-500">Pending</td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">MRI</td>
                  <td className="px-4 py-2">2024-11-18</td>
                  <td className="px-4 py-2 text-green-500">Completed</td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
=======
                {[
                  { patient: "John Doe", type: "CT Scan", date: "2024-11-20", status: "Pending" },
                  { patient: "Jane Smith", type: "MRI", date: "2024-11-18", status: "Completed" },
                ].map((scan, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-4 py-2">{scan.patient}</td>
                    <td className="px-4 py-2">{scan.type}</td>
                    <td className="px-4 py-2">{scan.date}</td>
                    <td
                      className={`px-4 py-2 text-center font-semibold rounded-full ${
                        scan.status === "Pending"
                          ? "text-yellow-600 bg-yellow-100"
                          : "text-green-600 bg-green-100"
                      }`}
                    >
                      {scan.status}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button className="text-blue-500 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
>>>>>>> Stashed changes
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleChat}
          className="p-4 bg-blue-500 rounded-full shadow-lg text-white hover:bg-blue-600 focus:outline-none"
        >
          <i className="fas fa-comments"></i>
        </button>

        {isChatOpen && (
<<<<<<< Updated upstream
          <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-lg p-4">
=======
          <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-lg p-4 transition-transform transform duration-300">
>>>>>>> Stashed changes
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-700">Chatbot</h3>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
            </div>
            <div className="mt-4 flex flex-col space-y-2 overflow-y-auto h-64">
<<<<<<< Updated upstream
              {/* Chat messages here */}
              <p className="text-gray-600">Hello! How can I assist you?</p>
=======
              <p className="bg-gray-200 p-2 rounded-lg">Hello! How can I assist you?</p>
>>>>>>> Stashed changes
            </div>
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Type a message..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsDashboard;
