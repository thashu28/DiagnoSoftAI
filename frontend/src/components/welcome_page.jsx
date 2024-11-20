import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-800 text-white w-full py-6 fixed top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <img src="/diagnosoftai-logo.png" alt="DiagnosoftAI Logo" className="h-12" />
            <h1 className="ml-4 text-2xl font-semibold">DiagnosoftAI</h1>
          </div>
          {/* Navigation Buttons */}
          <div className="flex space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-yellow-500 transition duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-yellow-500 transition duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-yellow-500 transition duration-300"
            >
              Services
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center bg-blue-100 py-20 w-full mt-20"
      >
        <h2 className="text-4xl font-bold text-center mb-4">Welcome to DiagnosoftAI</h2>
        <p className="text-lg text-center mb-8 max-w-2xl">
          DiagnosoftAI leverages the power of AI to revolutionize healthcare.
          Our AI-driven platform assists healthcare professionals in providing faster, more accurate diagnosis, improving patient outcomes.
        </p>

        {/* Buttons for Login and Signup */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-500 transition ease-in-out duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-yellow-400 transition ease-in-out duration-300"
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="flex flex-col items-center justify-center bg-gray-200 py-20 w-full"
      >
        <h2 className="text-3xl font-bold mb-4">About DiagnosoftAI</h2>
        <p className="text-lg max-w-3xl text-center">
          DiagnosoftAI is committed to leveraging cutting-edge AI technology to transform
          the healthcare industry. With tools that support healthcare professionals, we aim
          to enhance patient care, streamline diagnosis, and save lives.
        </p>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="flex flex-col items-center justify-center bg-white py-20 w-full"
      >
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <ul className="text-lg list-disc list-inside">
          <li>AI-Assisted Diagnosis</li>
          <li>Comprehensive Patient Reports</li>
          <li>Secure Communication Platform</li>
          <li>Data-Driven Insights for Medical Professionals</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-white py-6 w-full">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 DiagnosoftAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
