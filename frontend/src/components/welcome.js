// src/pages/WelcomePage.js
import React from 'react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-md w-4/5 lg:w-2/5">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Welcome to DiagnoSoftAI
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Empowering healthcare with intelligent diagnosis. We are here to assist doctors, lab technicians, and patients with seamless medical processes.
        </p>
        <div className="text-center">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
