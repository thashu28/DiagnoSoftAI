import React, { useState } from "react";
import { FiUser, FiSend } from "react-icons/fi";

// Static users for demo purposes
const users = [
  { id: 1, name: "Dr. John Doe", role: "doctor" },
  { id: 2, name: "Dr. Jane Smith", role: "doctor" },
  { id: 3, name: "Patient 1", role: "patient" },
  { id: 4, name: "Patient 2", role: "patient" },
  { id: 5, name: "Lab Technician A", role: "lab" },
  { id: 6, name: "Lab Technician B", role: "lab" },
];

const ChatSystem = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", message, timestamp: new Date().toLocaleTimeString() },
      ]);
      setMessage("");
    }
  };

  // Filter users based on selected role
  const filteredUsers = users.filter((user) => user.role === selectedRole);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="text-center py-6 bg-gradient-to-r from-blue-200 via-blue-100 to-gray-100 text-gray-800 rounded-md shadow-md">
        <h1 className="text-3xl font-bold">Messages</h1>
      </header>

      {/* Role Selection */}
      <div className="text-center mt-6">
        <h2 className="text-lg text-gray-700 font-semibold mb-4">
          Select Your Role
        </h2>
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setSelectedRole("doctor")}
            className="flex items-center justify-center px-8 py-3 bg-blue-200 text-gray-800 rounded-full shadow-md hover:bg-blue-300 hover:scale-105 transform transition"
          >
            <FiUser className="mr-2" />
            Doctor
          </button>
          <button
            onClick={() => setSelectedRole("patient")}
            className="flex items-center justify-center px-8 py-3 bg-green-200 text-gray-800 rounded-full shadow-md hover:bg-green-300 hover:scale-105 transform transition"
          >
            <FiUser className="mr-2" />
            Patient
          </button>
          <button
            onClick={() => setSelectedRole("lab")}
            className="flex items-center justify-center px-8 py-3 bg-yellow-200 text-gray-800 rounded-full shadow-md hover:bg-yellow-300 hover:scale-105 transform transition"
          >
            <FiUser className="mr-2" />
            Lab Technician
          </button>
        </div>
      </div>

      {/* User List */}
      {selectedRole && (
        <div className="w-full max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s
          </h2>
          <ul className="space-y-4">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition ${
                  selectedUser?.id === user.id
                    ? "bg-gradient-to-r from-blue-100 via-gray-50 to-gray-100"
                    : ""
                }`}
              >
                <FiUser className="mr-3 text-blue-400" />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chat Window */}
      {selectedUser && (
        <div className="w-full max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Chat with {selectedUser.name}
          </h2>
          <div className="h-64 bg-gray-50 p-4 rounded-lg overflow-y-auto mb-4 shadow-inner">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg shadow-md text-sm ${
                    msg.sender === "You"
                      ? "bg-blue-100 text-gray-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>
                    <strong>{msg.sender}:</strong> {msg.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="flex items-center justify-center px-6 py-3 bg-blue-200 text-gray-800 rounded-full hover:bg-blue-300 shadow-md transform hover:scale-105 transition"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSystem;
