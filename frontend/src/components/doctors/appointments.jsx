import React, { useState, useEffect } from "react";
import { getAllPatients } from "../../../services/PatientService";
import { useLocation } from "react-router-dom";

const AppointmentSystem = () => {
  const location = useLocation();
  const { user } = location.state || {}; // user object containing doctor's details

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]); // Store appointments
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduledDate, setRescheduledDate] = useState("");
  const [rescheduledTime, setRescheduledTime] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Fetch patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        setPatients(response.data);
        console.log('response',response.data)
        // Filter appointments for the logged-in doctor (user.id)
        const doctorAppointments = response.data.flatMap(patient => 
          patient.appointments.filter(appointment => appointment.doctor === user.id)
        );
        setAppointments(doctorAppointments); // Only appointments assigned to the logged-in doctor
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [user.id]);

  const handleReschedule = () => {
    if (rescheduledDate && rescheduledTime) {
      setSelectedAppointment({
        ...selectedAppointment,
        date: rescheduledDate,
        time: rescheduledTime,
      });
      alert(`Appointment for ${selectedAppointment.patientName} rescheduled.`);
    } else {
      alert("Please select both date and time to reschedule.");
    }
  };

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
    <div className="min-h-screen bg-gray-50 p-6">
      
        {/* Header */}
        <header className=" bg-gradient-to-r from-blue-200 via-blue-100 to-gray-100 text-gray-800 p-4 rounded-md shadow-md flex items-center justify-between">
        {/* Website Name */}
        <div className="font-serif italic text-blue-500 text-2xl tracking-wide">
          DiagnoSoftAI
        </div>
        <h1 className="text-3xl font-bold" style={{ marginRight: "30rem" }}>Appointments</h1>
      </header>

      {/* Appointments List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            onClick={() => setSelectedAppointment(appointment)}
            className={`p-6 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-transform transform ${
              selectedAppointment?._id === appointment._id
                ? "border-2 border-blue-300 bg-blue-50"
                : "bg-white"
            }`}
          >
            <h3 className="text-lg font-bold text-gray-800">
              {appointment.patientName}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Condition:</strong> {appointment.condition}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {appointment.date} at {appointment.time}
            </p>
          </div>
        ))}
      </div>

      {/* Appointment Details */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg text-gray-700">
              <strong>Patient:</strong> {selectedAppointment?.patientName}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Date:</strong> {selectedAppointment?.date}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Time:</strong> {selectedAppointment?.time}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Condition:</strong>{" "}
              <span
                className={`${
                  selectedAppointment?.condition === "Critical"
                    ? "text-red-500 font-semibold"
                    : "text-green-500 font-semibold"
                }`}
              >
                {selectedAppointment?.condition}
              </span>
            </p>
          </div>

          {/* Reschedule Form */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Reschedule Appointment
            </h3>
            <input
              type="date"
              value={rescheduledDate}
              onChange={(e) => setRescheduledDate(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="time"
              value={rescheduledTime}
              onChange={(e) => setRescheduledTime(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleReschedule}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Reschedule Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Chat System */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Chat with Patient</h3>
        <div className="h-64 bg-gray-100 p-4 rounded-lg overflow-y-auto mb-4">
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-blue-100 text-gray-800 self-end ml-auto"
                    : "bg-gray-200 text-gray-800"
                } max-w-md`}
              >
                <p>
                  <strong>{msg.sender}:</strong> {msg.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              No messages yet. Start a conversation!
            </p>
          )}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSystem;
