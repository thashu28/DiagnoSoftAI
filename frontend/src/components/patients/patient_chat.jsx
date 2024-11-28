import React, { useState } from "react";

const PatientChat = () => {
  const [chatOption, setChatOption] = useState(""); // Selected chat option (Doctor or Lab Technician)
  const [messages, setMessages] = useState([]); // Chat messages
  const [inputMessage, setInputMessage] = useState(""); // Current input message

  const handleChatSelection = (option) => {
    setChatOption(option);
    setMessages([
      { sender: "System", text: `You are now chatting with a ${option}` },
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-800 text-white py-4 px-6">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        {/* Chat Option Selector */}
        <div className="bg-white p-6 shadow-md rounded-lg mx-auto w-3/4 md:w-1/2 mb-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Chat with a Doctor or Lab Technician
          </h2>
          <div className="flex justify-around">
            <button
              onClick={() => handleChatSelection("Doctor")}
              className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 ${
                chatOption === "Doctor" ? "opacity-50" : ""
              }`}
              disabled={chatOption === "Doctor"}
            >
              Doctor
            </button>
            <button
              onClick={() => handleChatSelection("Lab Technician")}
              className={`bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 ${
                chatOption === "Lab Technician" ? "opacity-50" : ""
              }`}
              disabled={chatOption === "Lab Technician"}
            >
              Lab Technician
            </button>
          </div>
        </div>

        {/* Chat Block */}
        {chatOption && (
          <div className="bg-white p-6 shadow-md rounded-lg mx-auto w-3/4 md:w-1/2">
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
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-2"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-yellow-800 text-white py-4 text-center">
        <p>&copy; 2024 DiagnoSoftAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PatientChat;
