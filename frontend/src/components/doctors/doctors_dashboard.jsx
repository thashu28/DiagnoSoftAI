
import React from "react";
import { Link } from "react-router-dom";
// Emergency Cases & Reminders (Static Data)
const emergencyCases = [
  { caseId: "EC123", patient: "Alice Johnson", status: "Critical", condition: "Severe Asthma Attack" },
  { caseId: "EC124", patient: "Bob Brown", status: "Urgent", condition: "Heart Failure" },
  { caseId: "EC125", patient: "Mary Wilson", status: "Critical", condition: "Stroke" },
  { caseId: "EC126", patient: "James Miller", status: "Urgent", condition: "Severe Blood Loss" },
  { caseId: "EC127", patient: "Linda Harris", status: "Critical", condition: "Acute Respiratory Distress" },
  { caseId: "EC128", patient: "Thomas Lee", status: "Urgent", condition: "Fractured Leg" },
  { caseId: "EC129", patient: "Rachel Green", status: "Critical", condition: "Pneumonia" },
];
const reminders = [
  "Update patient medical records by 5:00 PM.",
  "Complete all pending prescriptions for the day.",
  "Prepare patient discharge summaries before the evening shift.",
  "Review all patient scan results before the end of the day.",
  "Consult with specialists for patient Olivia Martinez’s case.",
  "Verify patient vaccination schedules.",
  "Call back patient John Doe for follow-up.",
];
// Doctor Dashboard Component
const DoctorDashboard = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    {/* Header */}
    <header className="bg-blue-800 text-white py-4 px-8">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
    </header>
    {/* Main Content */}
    <div className="flex flex-col lg:flex-row flex-grow">
      {/* Left Sidebar (Quick Actions) */}
      <aside className="w-full lg:w-1/3 bg-blue-50 p-6 border-b lg:border-r">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <ul className="space-y-4">
          {["Appointments", "View Scans", "Chatbot", "Patient Results"].map((action, index) => (
            <li key={index}>
              <Link
                to={`/doctor_dashboard/${action.toLowerCase().replace(" ", "_")}`}
                className="w-full block bg-blue-500 text-white py-3 px-4 text-center rounded-lg hover:bg-blue-400"
              >
                {action}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* Placeholder for Main Content */}
      <main className="w-full lg:w-2/3 p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Doctor Dashboard</h2>
        <p className="text-gray-600">
          Use the links on the left sidebar to navigate through various sections such as Appointments, Scans, and more.
        </p>
      </main>
      {/* Right Sidebar with Modals */}
      <aside className="w-full lg:w-1/3 bg-blue-50 p-6 border-t lg:border-l flex flex-col">
        {/* Emergency Cases Modal */}
        <section className="h-1/4 bg-white shadow-md rounded-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Emergency Cases</h2>
          <ul className="divide-y">
            {emergencyCases.map((emergency, index) => (
              <li key={index} className="py-2">
                <p className="font-semibold">{emergency.patient}</p>
                <p className="text-sm text-gray-600">
                  Case ID: {emergency.caseId} - {emergency.condition} ({emergency.status})
                </p>
              </li>
            ))}
          </ul>
        </section>
        {/* Reminders Modal */}
        <section className="h-1/4 bg-white shadow-md rounded-lg p-4 overflow-y-auto mt-4">
          <h2 className="text-xl font-semibold mb-4">Reminders</h2>
          <ul>
            {reminders.map((reminder, index) => (
              <li key={index} className="mb-2 text-sm">
                {reminder}
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
    {/* Footer */}
    <footer className="bg-blue-800 text-white py-4 text-center">
      <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
    </footer>
  </div>
);
export default DoctorDashboard;

