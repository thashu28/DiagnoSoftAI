import React from "react";

const appointments = [
  { patient: "John Doe", time: "10:00 AM", date: "20th Nov", reason: "Routine Checkup" },
  { patient: "Jane Smith", time: "11:30 AM", date: "20th Nov", reason: "Follow-up Consultation" },
  { patient: "Sarah Lee", time: "1:00 PM", date: "20th Nov", reason: "Blood Test Results" },
  { patient: "Michael Johnson", time: "3:00 PM", date: "20th Nov", reason: "Cardiology Consultation" },
  { patient: "Emily Davis", time: "4:30 PM", date: "20th Nov", reason: "Vaccination" },
  { patient: "David Brown", time: "5:00 PM", date: "20th Nov", reason: "Health Screening" },
  { patient: "Olivia Martinez", time: "6:00 PM", date: "20th Nov", reason: "Consultation for Injury" },
];

const Appointments = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
    <ul>
      {appointments.map((appt, index) => (
        <li key={index} className="py-2">
          <p>{appt.patient} - {appt.date} - {appt.time} ({appt.reason})</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Appointments;
