       import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../components/welcome_page';
import LoginPage from '../components/login';
import SignupPage from '../components/signup';
import DoctorDashboard from '../components/doctors/doctors_dashboard';
import LabTechnicianDashboard from '../components/lab_technician/lab_technician';
import PatientDashboard from '../components/patients/patients_dashboard';



// Importing the new pages for Doctor's Dashboard features
import AppointmentSystem from '../components/doctors/appointments';
import ViewScans from '../components/doctors/view_scans';
import PatientResults from '../components/doctors/patients_results';
import ChatSystem from '../components/doctors/chatbot';

// Importing the new page in the Patient Dashboard
import ScheduleAppointments from '../components/patients/schedule_appointments';
import PatientViewScans from '../components/patients/view_scans'; // New import
import ViewReports from '../components/patients/view_reports'; // New import 
import PatientChat from '../components/patients/patient_Chat';

// Importing the new page in the Lab technician Dashboard
import LabTechnicianChat from '../components/lab_technician/labtechnician_chat';
import UploadScans from '../components/lab_technician/upload_scans';
import EmergencyScans from '../components/lab_technician/emergency_scans';
import LabTechniciansTestReports from '../components/lab_technician/test_reports';

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
          <Route path="/patients_dashboard" element={<PatientDashboard />} />

          {/* Doctor Dashboard Feature Routes */}
          <Route path="/doctor_dashboard/appointments" element={<AppointmentSystem />} />
          <Route path="/doctor_dashboard/view_scans" element={<ViewScans />} />
          <Route path="/doctor_dashboard/patients_results" element={<PatientResults />} />
          <Route path="/doctor_dashboard/chatbot" element={<ChatSystem />} />


          {/* Patient Dashboard Feature Routes */}
          <Route path="/patients_dashboard/schedule_appointments" element={<ScheduleAppointments />} />
          <Route path="/patients_dashboard/view_scans" element={<PatientViewScans />} /> {/* New route */}
          <Route path="/patients_dashboard/view_reports" element={<ViewReports />} />
          <Route path="/patients_dashboard/patient_chat" element={<PatientChat />} />

          {/* Lab Technician Dashboard Feature Routes */}
          <Route path="/lab_technician/upload_scans" element={<UploadScans />} />
          <Route path="/lab_technician/labtechnician_chat" element={<LabTechnicianChat />} />
          <Route path="/lab_technician/emergency_scans" element={<EmergencyScans />} />
          <Route path="/lab_technician/test_reports" element={<LabTechniciansTestReports />} />
        </Routes>
      </main>
    </>
  );
};

export default Layout;
