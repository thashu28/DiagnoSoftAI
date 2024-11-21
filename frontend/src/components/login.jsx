import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Static User Data
const staticUserData = [
  { username: "doctorUser", password: "password123", role: "doctor" },
  { username: "patientUser", password: "password123", role: "patient" },
  { username: "labUser", password: "password123", role: "labTechnician" },
];

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user credentials match the static data
    const user = staticUserData.find(
      (user) =>
        user.username === formData.username && user.password === formData.password
    );

    if (user) {
      setMessage("Login successful!");
      // Navigate to the appropriate dashboard based on the user's role
      if (user.role === "doctor") {
        navigate("/doctors_dashboard");
      } else if (user.role === "patient") {
        navigate("/patients");
      } else if (user.role === "labTechnician") {
        navigate("/lab_technician");
      }
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition ease-in-out duration-300"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
