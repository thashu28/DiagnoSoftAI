import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import DoctorsDashboard from '../doctors_dashboard';

// Mock the required services and hooks
jest.mock('../../../../services/PatientService', () => ({
  getAllPatients: jest.fn().mockResolvedValue({ data: [] })
}));

// Mock useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      user: {
        id: 'testDoctorId',
        name: 'Dr. Test'
      }
    }
  }),
  useNavigate: () => jest.fn()
}));

describe('DoctorsDashboard', () => {
  it('renders the dashboard with main UI elements', () => {
    render(
      <BrowserRouter>
        <DoctorsDashboard />
      </BrowserRouter>
    );

    // Check if main UI elements are present
    expect(screen.getByText('DiagnoSoftAI')).toBeInTheDocument();
    expect(screen.getByText('Welcome, Doctor!')).toBeInTheDocument();
    expect(screen.getByText('Assigned Scans')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    
    // Check if navigation links are present
    expect(screen.getByText('Patients')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('View Scan Reports')).toBeInTheDocument();
    expect(screen.getByText('Medical Image Analysis')).toBeInTheDocument();
    expect(screen.getByText('AI chat assistant')).toBeInTheDocument();
  });
});