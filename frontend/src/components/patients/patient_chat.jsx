import React from "react";
import MedicalChatbot from "./MedicalChatbot";

const PatientChat = () => {
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

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Medical Assistant
          </h2>
          <div className="h-full">
            <MedicalChatbot />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Diagnosoft AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PatientChat;
