import React, { useState, useEffect } from "react";
import {
  getAllPatients,
  rescheduleAppointment,
  deleteAppointment,
} from "../../../services/PatientService";
import { useLocation } from "react-router-dom";

const AppointmentSystem = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduledDate, setRescheduledDate] = useState("");
  const [rescheduledTime, setRescheduledTime] = useState("");
  const [activeTab, setActiveTab] = useState("reschedule");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        setPatients(response.data);

        const doctorAppointments = response.data.flatMap((patient) =>
          patient.appointments
            .filter((appointment) => appointment.doctor === user?.id)
            .map((appointment) => ({
              ...appointment,
              patientId: patient._id,
              patientName: patient.name,
              patientAge: patient.age,
              patientGender: patient.gender,
              medicalHistory: patient.medicalHistory,
              allergies: patient.allergies,
              currentMedication: patient.currentMedication,
            }))
        );

        setAppointments(doctorAppointments);
        if (doctorAppointments.length > 0) {
          setSelectedAppointment(doctorAppointments[0]);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [user?.id]);

  const formatTime12Hour = (time) => {
    const [hour, minute] = time.split(":");
    const intHour = parseInt(hour, 10);
    const isPM = intHour >= 12;
    const formattedHour = intHour % 12 || 12;
    return `${formattedHour}:${minute} ${isPM ? "PM" : "AM"}`;
  };

  const handleReschedule = async () => {
    if (rescheduledDate && rescheduledTime) {
      try {
        await rescheduleAppointment(
          selectedAppointment.patientId,
          selectedAppointment._id,
          { date: rescheduledDate, time: rescheduledTime }
        );
        setSelectedAppointment({
          ...selectedAppointment,
          date: rescheduledDate,
          time: rescheduledTime,
        });
        alert(`Appointment for ${selectedAppointment.patientName} rescheduled.`);
      } catch (error) {
        console.error("Error rescheduling appointment:", error);
        alert("Error rescheduling appointment.");
      }
    } else {
      alert("Please select both date and time to reschedule.");
    }
  };

  const handleCancelAppointment = async () => {
    try {
      await deleteAppointment(
        selectedAppointment.patientId,
        selectedAppointment._id
      );
      setAppointments((prev) =>
        prev.filter((appt) => appt._id !== selectedAppointment._id)
      );
      setSelectedAppointment(null);
      alert(`Appointment for ${selectedAppointment.patientName} cancelled.`);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Error deleting appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-gradient-to-r from-blue-200 via-blue-100 to-gray-100 text-gray-800 p-4 rounded-md shadow-md flex items-center justify-between">
        <div className="font-serif italic text-blue-500 text-2xl tracking-wide">
          DiagnoSoftAI
        </div>
        <h1 className="text-3xl font-bold" style={{ marginRight: "30rem" }}>
          Appointments
        </h1>
      </header>

      <div className="mt-6 flex">
        <div className="w-1/4">
          {appointments.length > 0 ? (
            <div className="mt-6">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  onClick={() => setSelectedAppointment(appointment)}
                  className={`p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-transform transform ${
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
                    {new Date(appointment.date).toLocaleDateString()} at{" "}
                    {formatTime12Hour(appointment.time)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center mt-4">
              No appointments available.
            </p>
          )}
        </div>

        <div className="w-3/4 ml-6 bg-white p-6 rounded-lg shadow-md">
          {selectedAppointment ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Appointment Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-lg text-gray-700">
                    <strong>Name:</strong> {selectedAppointment.patientName}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Age:</strong> {selectedAppointment.patientAge}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Gender:</strong> {selectedAppointment.patientGender}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Medical History:</strong>{" "}
                    {selectedAppointment.medicalHistory || "None"}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Allergies:</strong>{" "}
                    {selectedAppointment.allergies || "None"}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Current Medication:</strong>{" "}
                    {selectedAppointment.currentMedication || "None"}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Date:</strong>{" "}
                    {new Date(selectedAppointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Time:</strong>{" "}
                    {formatTime12Hour(selectedAppointment.time)}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Condition:</strong>{" "}
                    <span
                      className={`${
                        selectedAppointment.condition === "Critical"
                          ? "text-red-500 font-semibold"
                          : "text-green-500 font-semibold"
                      }`}
                    >
                      {selectedAppointment.condition}
                    </span>
                  </p>
                </div>

                <div className="w-full">
                  <div className="flex border-b-2 border-gray-200">
                    <button
                      className={`${
                        activeTab === "reschedule"
                          ? "text-blue-500 border-b-2 border-blue-500 font-semibold"
                          : "text-gray-600"
                      } py-2 px-4`}
                      onClick={() => setActiveTab("reschedule")}
                    >
                      Reschedule
                    </button>
                    <button
                      className={`${
                        activeTab === "cancel"
                          ? "text-red-500 border-b-2 border-red-500 font-semibold"
                          : "text-gray-600"
                      } py-2 px-4`}
                      onClick={() => setActiveTab("cancel")}
                    >
                      Cancel the Appointment
                    </button>
                  </div>

                  {activeTab === "reschedule" ? (
                    <div className="bg-blue-50 p-4 rounded-lg shadow-inner mt-4">
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
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                      >
                        Reschedule
                      </button>
                    </div>
                  ) : (
                    <div className="bg-red-50 p-4 rounded-lg shadow-inner mt-4">
                      <h3 className="text-lg font-semibold text-red-500 mb-3">
                        Cancel Appointment
                      </h3>
                      <button
                        onClick={handleCancelAppointment}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                      >
                        Confirm Cancellation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select an appointment to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentSystem;
