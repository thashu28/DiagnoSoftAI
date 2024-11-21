import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../components/welcome_page';
import LoginPage from '../components/login';
import SignupPage from '../components/signup';
import DoctorDashboard from '../components/doctors/doctors_dashboard';
import LabTechnicianDashboard from '../components/lab_technician/lab_technician';
import PatientDashboard from '../components/patients/patients';

// Importing the new pages for Doctor's Dashboard features
import Appointments from '../components/doctors/appointments';
import ViewScans from '../components/doctors/view_scans';
import ChatBot from '../components/doctors/chatbot';
import PatientResults from '../components/doctors/patients_results';

const Layout = () => {
  return (
    <>
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard Routes */}
          <Route path="/doctors_dashboard" element={<DoctorDashboard />} />
          <Route path="/lab_technician" element={<LabTechnicianDashboard />} />
          <Route path="/patients" element={<PatientDashboard />} />

          {/* Doctor Dashboard Feature Routes */}
          <Route path="/doctor_dashboard/appointments" element={<Appointments />} />
          <Route path="/doctor_dashboard/view_scans" element={<ViewScans />} />
          <Route path="/doctor_dashboard/chatbot" element={<ChatBot />} />
          <Route path="/doctor_dashboard/patients_results" element={<PatientResults />} />
        </Routes>
      </main>
    </>
  );
};

export default Layout;
