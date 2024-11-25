import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Simulate loading state for buttons
  const handleClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000); // Simulate delay
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
      {/* Header Section */}
      <header className="bg-blue-800 text-white w-full py-4 fixed top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img
              src="/diagnosoftai-logo.png"
              alt="DiagnosoftAI Logo"
              className="h-10"
            />
            <h1 className="ml-4 text-xl md:text-2xl font-semibold tracking-wide">
              DiagnosoftAI
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-6">
            {["home", "about", "services", "what doctors say about us"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm md:text-base ${
                  activeSection === section
                    ? "font-bold underline"
                    : "hover:text-yellow-400 transition duration-300"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center bg-blue-100 py-40 w-full mt-16 md:mt-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-blue-900">
          Welcome to DiagnosoftAI
        </h2>
        <p className="text-md md:text-lg text-center mb-10 max-w-3xl text-gray-700">
          DiagnosoftAI leverages the power of AI to revolutionize healthcare.
          Our AI-driven platform assists healthcare professionals in providing
          faster, more accurate diagnosis, improving patient outcomes.
        </p>

        {/* Buttons for Login and Signup */}
        <div className="flex space-x-6">
          <button
            onClick={() => handleClick("/login")}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg shadow hover:bg-blue-500 transition ease-in-out duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <button
            onClick={() => handleClick("/signup")}
            className="bg-yellow-500 text-white py-3 px-8 rounded-lg text-lg shadow hover:bg-yellow-400 transition ease-in-out duration-300"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="flex flex-col items-center justify-center bg-gray-100 py-40 w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          About DiagnosoftAI
        </h2>
        <p className="text-md md:text-lg max-w-3xl text-center text-gray-700">
          DiagnosoftAI is committed to leveraging cutting-edge AI technology to
          transform the healthcare industry. With tools that support healthcare
          professionals, we aim to enhance patient care, streamline diagnosis,
          and save lives.
        </p>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="flex flex-col items-center justify-center bg-white py-40 w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {[
            "AI-Assisted Diagnosis",
            "Comprehensive Patient Reports",
            "Secure Communication Platform",
            "Data-Driven Insights for Medical Professionals",
          ].map((service, index) => (
            <div
              key={index}
              className="p-8 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{service}</h3>
              <p className="text-gray-600">
                {`Explore our innovative ${service.toLowerCase()}.`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="what doctors say about us"
        className="py-40 bg-blue-50 w-full flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[
            {
              quote: "DiagnosoftAI transformed our workflow!",
              name: "Dr. Jane Doe",
            },
            {
              quote: "The platform is incredibly accurate and fast.",
              name: "Dr. John Smith",
            },
            {
              quote: "Highly recommend for healthcare professionals!",
              name: "Dr. Emily Clark",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white shadow-md rounded-lg text-center"
            >
              <p className="italic text-gray-600">"{testimonial.quote}"</p>
              <h4 className="font-semibold mt-4">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-white py-6 w-full">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} DiagnosoftAI. All Rights Reserved.</p>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            {["Home", "About", "Services", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:underline"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
