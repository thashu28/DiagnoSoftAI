import React from "react";

const ScheduleAppointments = () => {
  // Static data for appointment scheduling
  const availableAppointments = [
    { doctor: "Dr. Sarah Lee", date: "22nd Nov", time: "11:00 AM" },
    { doctor: "Dr. John Doe", date: "23rd Nov", time: "9:00 AM" },
    { doctor: "Dr. Emily Stone", date: "24th Nov", time: "1:00 PM" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-800 text-white py-4 px-6">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Appointments</h2>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <ul>
            {availableAppointments.map((appointment, index) => (
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
                  Schedule
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-yellow-800 text-white py-4 text-center">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ScheduleAppointments;
