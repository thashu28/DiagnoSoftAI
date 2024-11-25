<<<<<<< Updated upstream
=======
// import React, { useState } from "react";

// // Static data for demo purposes
// const appointments = [
//   {
//     id: 1,
//     patientName: "John Doe",
//     date: "2024-11-25",
//     time: "10:00 AM",
//     condition: "Critical",
//     chatAvailable: true,
//   },
//   {
//     id: 2,
//     patientName: "Jane Smith",
//     date: "2024-11-26",
//     time: "02:00 PM",
//     condition: "Stable",
//     chatAvailable: true,
//   },
// ];

// const AppointmentSystem = () => {
//   const [selectedAppointment, setSelectedAppointment] = useState(appointments[0]);
//   const [rescheduledDate, setRescheduledDate] = useState("");
//   const [rescheduledTime, setRescheduledTime] = useState("");
//   const [chatMessage, setChatMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);

//   // Handle rescheduling the appointment
//   const handleReschedule = () => {
//     setSelectedAppointment({
//       ...selectedAppointment,
//       date: rescheduledDate,
//       time: rescheduledTime,
//     });
//     alert(`Appointment for ${selectedAppointment.patientName} rescheduled.`);
//   };

//   // Handle sending chat messages
//   const handleSendMessage = () => {
//     if (chatMessage.trim()) {
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "You", message: chatMessage },
//       ]);
//       setChatMessage("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Appointment Header */}
//       <header className="bg-white p-4 rounded shadow-md">
//         <h1 className="text-2xl font-semibold text-gray-700">Appointments</h1>
//       </header>

//       {/* Appointments List */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {appointments.map((appointment) => (
//           <div
//             key={appointment.id}
//             onClick={() => setSelectedAppointment(appointment)}
//             className={`p-6 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 ${
//               selectedAppointment.id === appointment.id
//                 ? "border-2 border-blue-500"
//                 : ""
//             }`}
//           >
//             <h3 className="text-lg font-semibold text-gray-700">
//               {appointment.patientName}
//             </h3>
//             <p className="text-sm text-gray-600">Condition: {appointment.condition}</p>
//             <p className="text-sm text-gray-600">
//               {appointment.date} at {appointment.time}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Appointment Details */}
//       <div className="mt-6 bg-white p-6 rounded shadow-md">
//         <h2 className="text-lg font-semibold text-gray-700">Appointment Details</h2>
//         <p className="mt-2 text-gray-700">
//           <strong>Patient:</strong> {selectedAppointment.patientName}
//         </p>
//         <p className="mt-2 text-gray-700">
//           <strong>Date:</strong> {selectedAppointment.date}
//         </p>
//         <p className="mt-2 text-gray-700">
//           <strong>Time:</strong> {selectedAppointment.time}
//         </p>
//         <p className="mt-2 text-gray-700">
//           <strong>Condition:</strong> {selectedAppointment.condition}
//         </p>

//         {/* Reschedule Form */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-700">Reschedule Appointment</h3>
//           <div className="flex flex-col mt-4 space-y-4">
//             <input
//               type="date"
//               value={rescheduledDate}
//               onChange={(e) => setRescheduledDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Select new date"
//             />
//             <input
//               type="time"
//               value={rescheduledTime}
//               onChange={(e) => setRescheduledTime(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Select new time"
//             />
//             <button
//               onClick={handleReschedule}
//               className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Reschedule Appointment
//             </button>
//           </div>
//         </div>

//         {/* Chat System */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-700">Chat with Patient</h3>
//           <div className="h-64 bg-gray-50 p-4 rounded-lg overflow-y-auto mb-4">
//             {/* Display chat messages */}
//             {chatMessages.map((msg, index) => (
//               <div key={index} className="mb-2">
//                 <p
//                   className={`${
//                     msg.sender === "You" ? "text-blue-500" : "text-gray-700"
//                   }`}
//                 >
//                   <strong>{msg.sender}:</strong> {msg.message}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={chatMessage}
//               onChange={(e) => setChatMessage(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Type a message..."
//             />
//             <button
//               onClick={handleSendMessage}
//               className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentSystem;


>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  {
    id: 3,
    patientName: "Alice Johnson",
    date: "2024-11-27",
    time: "11:00 AM",
    condition: "Critical",
    chatAvailable: false,
  },
>>>>>>> Stashed changes
];

const AppointmentSystem = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(appointments[0]);
  const [rescheduledDate, setRescheduledDate] = useState("");
  const [rescheduledTime, setRescheduledTime] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Handle rescheduling the appointment
  const handleReschedule = () => {
<<<<<<< Updated upstream
    setSelectedAppointment({
      ...selectedAppointment,
      date: rescheduledDate,
      time: rescheduledTime,
    });
    alert(`Appointment for ${selectedAppointment.patientName} rescheduled.`);
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Appointment Header */}
      <header className="bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">Appointments</h1>
      </header>

      {/* Appointments List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
=======
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Appointment Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded shadow-md">
        <h1 className="text-3xl font-semibold">Appointments</h1>
      </header>

      {/* Appointments List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
>>>>>>> Stashed changes
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => setSelectedAppointment(appointment)}
<<<<<<< Updated upstream
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
=======
            className={`p-6 shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-transform transform ${
              selectedAppointment.id === appointment.id
                ? "border-4 border-blue-500 bg-blue-50 scale-105"
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
>>>>>>> Stashed changes
              {appointment.date} at {appointment.time}
            </p>
          </div>
        ))}
      </div>

      {/* Appointment Details */}
<<<<<<< Updated upstream
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
=======
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg text-gray-700">
              <strong>Patient:</strong> {selectedAppointment.patientName}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Date:</strong> {selectedAppointment.date}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Time:</strong> {selectedAppointment.time}
            </p>
            <p className="text-lg text-gray-700 mt-2">
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

          {/* Reschedule Form */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Reschedule Appointment
            </h3>
>>>>>>> Stashed changes
            <input
              type="date"
              value={rescheduledDate}
              onChange={(e) => setRescheduledDate(e.target.value)}
<<<<<<< Updated upstream
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Select new date"
=======
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> Stashed changes
            />
            <input
              type="time"
              value={rescheduledTime}
              onChange={(e) => setRescheduledTime(e.target.value)}
<<<<<<< Updated upstream
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Select new time"
            />
            <button
              onClick={handleReschedule}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
=======
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleReschedule}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
>>>>>>> Stashed changes
            >
              Reschedule Appointment
            </button>
          </div>
        </div>
<<<<<<< Updated upstream

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
=======
      </div>

      {/* Chat System */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Chat with Patient</h3>
        <div className="h-64 bg-gray-100 p-4 rounded-lg overflow-y-auto mb-4">
          {/* Display chat messages */}
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white self-end ml-auto"
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
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default AppointmentSystem;
