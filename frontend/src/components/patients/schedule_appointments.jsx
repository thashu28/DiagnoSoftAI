import React, { useState, useEffect } from "react";
import { getAllDoctors } from "../../../services/DoctorService"; // assuming your service is in a services file
import ReactDatePicker from "react-datepicker"; // Import date picker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import { addAppointment } from "../../../services/PatientService"; // assuming you have this service for making API calls

const ScheduleAppointments = ({ patientId }) => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor
  const [appointmentDate, setAppointmentDate] = useState(null); // Selected date
  const [appointmentTime, setAppointmentTime] = useState(""); // Selected time
  const [condition, setCondition] = useState(""); // Selected condition
  const [description, setDescription] = useState(""); // Appointment description
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For handling errors

  // Fetch the doctors' data when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors(); // Get all doctors
        setDoctors(response.data); // Update state with doctor data
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleScheduleClick = (doctor) => {
    setSelectedDoctor(doctor); // Set selected doctor when scheduling an appointment
    setIsModalOpen(true); // Open modal 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
    setError(null); // Reset error state on modal close
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime || !condition || !description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true); // Show loading indicator
      const appointmentData = {
        doctor: selectedDoctor._id, // doctor ID from the selected doctor
        date: appointmentDate,
        time: appointmentTime,
        condition,
        description,
      };

      // PUT request to confirm the appointment
      const response = await addAppointment(patientId, appointmentData);
      console.log("response",response);
      console.log("Appointment scheduled:", response);
      setIsModalOpen(false); // Close modal after successful submission
      setIsLoading(false); // Hide loading indicator
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setError("Failed to schedule appointment. Please try again.");
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-yellow-800 text-white py-4 px-6">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Appointments</h2>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <ul>
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2 mb-2"
                >
                  <div>
                    <p className="font-semibold">{doctor.name}</p> {/* Display doctor name */}
                  </div>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400"
                    onClick={() => handleScheduleClick(doctor)} // Open modal on click
                  >
                    Schedule
                  </button>
                </li>
              ))
            ) : (
              <p>No doctors available</p> // Show message if no doctors are available
            )}
          </ul>
        </div>
      </main>

      {/* Modal for scheduling appointment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-2xl mb-4">Schedule Appointment with {selectedDoctor.name}</h3>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 mb-4">{error}</div> // Display error message
              )}
              <div className="mb-4">
                <label htmlFor="appointmentDate" className="block mb-2">Select Date</label>
                <ReactDatePicker
                  selected={appointmentDate}
                  onChange={setAppointmentDate}
                  dateFormat="yyyy-MM-dd"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="appointmentTime" className="block mb-2">Select Time</label>
                <select
                  id="appointmentTime"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="border p-2 w-full"
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
                <label htmlFor="condition" className="block mb-2">Condition</label>
                <select
                  id="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select Condition</option>
                  <option value="Critical">Critical</option>
                  <option value="Stable">Stable</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 w-full"
                  rows="4"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? "Confirming..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
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
