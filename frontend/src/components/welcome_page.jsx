import React from 'react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* Header Section */}
      <header className="bg-blue-800 text-white w-full py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/diagnosoftai-logo.png" alt="DiagnosoftAI Logo" className="h-12" />
            <h1 className="ml-4 text-2xl font-semibold">DiagnosoftAI</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-blue-100 py-12 w-full">
        <h2 className="text-4xl font-bold text-center mb-4">Welcome to DiagnosoftAI</h2>
        <p className="text-lg text-center mb-8 max-w-2xl">
          DiagnosoftAI leverages the power of AI to revolutionize healthcare.
          Our AI-driven platform assists healthcare professionals in providing faster, more accurate diagnosis, improving patient outcomes.
        </p>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">AI-Driven Diagnosis</h3>
            <p>Accurate and fast analysis of medical data to assist healthcare professionals in making informed decisions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Data Security</h3>
            <p>We ensure the highest levels of data security, complying with global standards for patient confidentiality.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Insights</h3>
            <p>Our system provides real-time insights and suggestions to help medical professionals in clinical settings.</p>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="bg-white py-12 w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Join Us Today</h2>
          <p className="text-lg mb-8">Sign up to start utilizing AI-powered tools for better healthcare.</p>
          <a href="/signup" className="bg-yellow-500 text-white py-3 px-8 rounded-lg text-lg hover:bg-yellow-400 transition ease-in-out duration-300">
            Sign Up
          </a>
        </div>
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
