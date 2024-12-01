import React, { useState } from "react";

const LabTechnicianChat = () => {
  const [chatOption, setChatOption] = useState(""); // Selected chat option (Doctor or Patient)
  const [messages, setMessages] = useState([]); // Chat messages
  const [inputMessage, setInputMessage] = useState(""); // Current input message

  const handleChatSelection = (option) => {
    setChatOption(option);
    setMessages([
      { sender: "System", text: `You are now chatting with a ${option}.` },
    ]); // Initialize chat messages with a system message
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", text: inputMessage },
      { sender: chatOption, text: `Response from ${chatOption}` }, // Simulated response
    ]);

    setInputMessage(""); // Clear input
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white py-4 px-6 shadow-md">
        <h1 className="text-3xl font-bold tracking-wide text-center">Lab Technician Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        {/* Chat Option Selector */}
        <div className="bg-white p-6 shadow-lg rounded-lg mx-auto w-3/4 md:w-1/2 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Chat with a Doctor or Patient
          </h2>
          <div className="flex justify-around">
            <button
              onClick={() => handleChatSelection("Doctor")}
              className={`px-6 py-3 rounded-lg transition-all text-white font-medium shadow-md ${
                chatOption === "Doctor"
                  ? "bg-indigo-500 opacity-75"
                  : "bg-indigo-500 hover:bg-indigo-400"
              }`}
              disabled={chatOption === "Doctor"}
            >
              Doctor
            </button>
            <button
              onClick={() => handleChatSelection("Patient")}
              className={`px-6 py-3 rounded-lg transition-all text-white font-medium shadow-md ${
                chatOption === "Patient"
                  ? "bg-green-500 opacity-75"
                  : "bg-green-500 hover:bg-green-400"
              }`}
              disabled={chatOption === "Patient"}
            >
              Patient
            </button>
          </div>
        </div>

        {/* Chat Block */}
        {chatOption && (
          <div className="bg-white p-6 shadow-lg rounded-lg mx-auto w-3/4 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Chat with {chatOption}
            </h3>
            <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <p
                  key={index}
                  className={`mb-2 ${
                    msg.sender === "You"
                      ? "text-right text-blue-500"
                      : "text-left text-gray-700"
                  }`}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center py-4">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LabTechnicianChat;
