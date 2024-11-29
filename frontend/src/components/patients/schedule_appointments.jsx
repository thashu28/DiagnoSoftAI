import React, { useState } from "react";

const ScheduleAppointments = () => {
  // Static data for appointment scheduling
  const availableAppointments = [
    { id: 1, doctor: "Dr. Sarah Lee", date: "2024-11-22", time: "11:00" },
    { id: 2, doctor: "Dr. John Doe", date: "2024-11-23", time: "09:00" },
    { id: 3, doctor: "Dr. Emily Stone", date: "2024-11-24", time: "13:00" },
  ];

  // State for handling modal visibility and selected appointment
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State for form fields
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // Function to handle scheduling (open modal)
  const handleSchedule = (appointment) => {
    setSelectedAppointment(appointment); // Set the selected appointment
    setCondition(""); // Reset condition and description
    setDescription(""); // Reset description
    setAppointmentDate(appointment.date); // Set default date
    setAppointmentTime(appointment.time); // Set default time
    setShowModal(true); // Show the modal
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null); // Reset selected appointment
  };

  // Function to handle form submission (simulating appointment creation)
  const handleConfirm = () => {
    const appointmentData = {
      doctor: selectedAppointment.id, // or selectedAppointment.doctor if you're storing doctor name
      date: appointmentDate,
      time: appointmentTime,
      condition,
      description,
    };
    console.log("Appointment scheduled:", appointmentData);
    alert("Appointment Scheduled!");
    closeModal();
  };

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
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400"
                  onClick={() => handleSchedule(appointment)} // Trigger modal open
                >
                  Schedule
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Schedule Appointment</h3>
            <p>
              <strong>Doctor:</strong> {selectedAppointment.doctor}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppointment.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedAppointment.time}
            </p>

            {/* Date Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium">Select Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 mt-1 border rounded"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            {/* Time Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium">Select Time</label>
              <input
                type="time"
                className="w-full px-3 py-2 mt-1 border rounded"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>

            {/* Condition Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium">Condition</label>
              <select
                className="w-full px-3 py-2 mt-1 border rounded"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Select condition</option>
                <option value="critical">Critical</option>
                <option value="stable">Stable</option>
                <option value="routine">Routine</option>
              </select>
            </div>

            {/* Description Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="w-full px-3 py-2 mt-1 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Additional details (optional)"
              ></textarea>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal} // Close modal
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
                onClick={handleConfirm} // Confirm appointment
              >
                Confirm
              </button>
            </div>

            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-yellow-800 text-white py-4 text-center">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ScheduleAppointments;
