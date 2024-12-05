import React, { useState, useEffect } from "react";
import { getAllDoctors } from "../../../services/DoctorService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addAppointment } from "../../../services/PatientService";
import { useLocation } from "react-router-dom";

const ScheduleAppointments = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    selectedDoctor: null,
    appointmentDate: null,
    appointmentTime: "",
    condition: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleScheduleClick = (doctor) => {
    setFormState((prev) => ({
      ...prev,
      selectedDoctor: doctor,
    }));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setError(null);
    setFormState({
      selectedDoctor: null,
      appointmentDate: null,
      appointmentTime: "",
      condition: "",
      description: "",
    });
  };

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { appointmentDate, appointmentTime, condition, description, selectedDoctor } =
      formState;

    if (!appointmentDate || !appointmentTime || !condition) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);

      const appointmentData = {
        doctor: selectedDoctor._id,
        date: appointmentDate.toISOString().split("T")[0],
        time: appointmentTime,
        condition,
        description,
      };
      const response = await addAppointment(user.id, appointmentData);
      console.log("Appointment scheduled:", response);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setError(error.message || "Failed to schedule appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

       {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 shadow-lg flex items-center justify-between">
        {/* Website Name */}
        <div className="font-serif italic text-blue-500 text-2xl tracking-wide">
          DiagnoSoftAI
        </div>
        {/* Patient Dashboard Title */}
        <h1 className="text-2xl font-bold" style={{ marginRight: "30rem" }}>Patient Dashboard</h1>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Appointments</h2>
        <div className="bg-white p-6 shadow-md rounded-lg">
          {doctors.length > 0 ? (
            <ul className="space-y-4">
              {doctors.map((doctor, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2 mb-2"
                >
                  <p className="font-semibold text-gray-800">{doctor.name}</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
                    onClick={() => handleScheduleClick(doctor)}
                  >
                    Schedule
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No doctors available</p>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Schedule Appointment with {formState.selectedDoctor.name}
            </h3>
            <form onSubmit={handleSubmit}>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="mb-4">
                <label htmlFor="appointmentDate" className="block text-gray-700 font-semibold mb-2">
                  Select Date
                </label>
                <ReactDatePicker
                  selected={formState.appointmentDate}
                  onChange={(date) => handleFormChange("appointmentDate", date)}
                  dateFormat="yyyy-MM-dd"
                  className="border p-2 w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="appointmentTime" className="block text-gray-700 font-semibold mb-2">
                  Select Time
                </label>
                <select
                  id="appointmentTime"
                  value={formState.appointmentTime}
                  onChange={(e) => handleFormChange("appointmentTime", e.target.value)}
                  className="border p-2 w-full rounded-lg"
                >
                  <option value="">Select Time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="condition" className="block text-gray-700 font-semibold mb-2">
                  Condition
                </label>
                <select
                  id="condition"
                  value={formState.condition}
                  onChange={(e) => handleFormChange("condition", e.target.value)}
                  className="border p-2 w-full rounded-lg"
                >
                  <option value="">Select Condition</option>
                  <option value="Critical">Critical</option>
                  <option value="Stable">Stable</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formState.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  className="border p-2 w-full rounded-lg"
                  rows="4"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Confirming..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ScheduleAppointments;
