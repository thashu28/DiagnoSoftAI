import React, { useState } from "react";

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
        { sender: "You", message },
      ]);
      setMessage("");
    }
  };

  // Filter users based on selected role
  const filteredUsers = users.filter((user) => user.role === selectedRole);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Chat System</h1>

      {/* Role Selection */}
      <div className="mb-6">
        <h2 className="text-lg text-gray-700">Select Your Role</h2>
        <div className="mt-2 flex space-x-4">
          <button
            onClick={() => setSelectedRole("doctor")}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Doctor
          </button>
          <button
            onClick={() => setSelectedRole("patient")}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Patient
          </button>
          <button
            onClick={() => setSelectedRole("lab")}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Lab Technician
          </button>
        </div>
      </div>

      {/* User List */}
      {selectedRole && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s
          </h2>
          <ul className="space-y-4">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chat Window */}
      {selectedUser && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Chat with {selectedUser.name}
          </h2>
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

          {/* Message Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSystem;