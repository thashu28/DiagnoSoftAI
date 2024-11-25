<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authservice';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authservice";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< Updated upstream
    setMessage('');

    try {
      // Call the login function from authService
      const response = await login(formData); 

      if (response && response.success) {
        setMessage('Login successful!');
        const { token, user } = response;
        
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem('authToken', token);

        // Redirect to the appropriate dashboard based on the user's role
        if (user.role === 'doctor') {
          navigate('/doctors_dashboard');
        } else if (user.role === 'patient') {
          navigate('/patients');
        } else if (user.role === 'labTechnician') {
          navigate('/lab_technician');
        }
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
=======
    setMessage("");

    try {
      const response = await login(formData);

      if (response && response.success) {
        setMessage("Login successful!");
        const { token, user } = response;
        localStorage.setItem("authToken", token);

        if (user.role === "doctor") navigate("/doctors_dashboard");
        else if (user.role === "patient") navigate("/patients");
        else if (user.role === "labTechnician") navigate("/lab_technician");
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
>>>>>>> Stashed changes
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
=======
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transition-transform hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">Log in to continue</p>
>>>>>>> Stashed changes
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
<<<<<<< Updated upstream
          <div className="mb-4">
=======
          <div className="mb-6">
>>>>>>> Stashed changes
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
            disabled={loading}
          >
<<<<<<< Updated upstream
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
=======
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        <div className="mt-6 text-center">
          <a
            href="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </a>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default LoginPage;
