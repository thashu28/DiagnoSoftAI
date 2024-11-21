import React, { useState } from "react";

// Static data for demo purposes
const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    date: "2024-11-25",
    time: "10:00 AM",
    condition: "Critical",
    chatAvailable: true,
  },
  {
    id: 2,
    patientName: "Jane Smith",
    date: "2024-11-26",
    time: "02:00 PM",
    condition: "Stable",
    chatAvailable: true,
  },
];

const AppointmentSystem = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(appointments[0]);
  const [rescheduledDate, setRescheduledDate] = useState("");
  const [rescheduledTime, setRescheduledTime] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Handle rescheduling the appointment
  const handleReschedule = () => {
    setSelectedAppointment({
      ...selectedAppointment,
      date: rescheduledDate,
      time: rescheduledTime,
    });
    alert(`Appointment for ${selectedAppointment.patientName} rescheduled.`);
  };

  // Handle sending chat messages
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", message: chatMessage },
      ]);
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Appointment Header */}
      <header className="bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">Appointments</h1>
      </header>

      {/* Appointments List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => setSelectedAppointment(appointment)}
            className={`p-6 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 ${
              selectedAppointment.id === appointment.id
                ? "border-2 border-blue-500"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {appointment.patientName}
            </h3>
            <p className="text-sm text-gray-600">Condition: {appointment.condition}</p>
            <p className="text-sm text-gray-600">
              {appointment.date} at {appointment.time}
            </p>
          </div>
        ))}
      </div>

      {/* Appointment Details */}
      <div className="mt-6 bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Appointment Details</h2>
        <p className="mt-2 text-gray-700">
          <strong>Patient:</strong> {selectedAppointment.patientName}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Date:</strong> {selectedAppointment.date}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Time:</strong> {selectedAppointment.time}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Condition:</strong> {selectedAppointment.condition}
        </p>

        {/* Reschedule Form */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Reschedule Appointment</h3>
          <div className="flex flex-col mt-4 space-y-4">
            <input
              type="date"
              value={rescheduledDate}
              onChange={(e) => setRescheduledDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Select new date"
            />
            <input
              type="time"
              value={rescheduledTime}
              onChange={(e) => setRescheduledTime(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Select new time"
            />
            <button
              onClick={handleReschedule}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Reschedule Appointment
            </button>
          </div>
        </div>

        {/* Chat System */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Chat with Patient</h3>
          <div className="h-64 bg-gray-50 p-4 rounded-lg overflow-y-auto mb-4">
            {/* Display chat messages */}
            {chatMessages.map((msg, index) => (
              <div key={index} className="mb-2">
                <p
                  className={`${
                    msg.sender === "You" ? "text-blue-500" : "text-gray-700"
                  }`}
                >
                  <strong>{msg.sender}:</strong> {msg.message}
                </p>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSystem;
