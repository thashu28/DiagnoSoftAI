import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PatientDashboard from '../patients_dashboard';
import '@testing-library/jest-dom';

// Mock useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      user: {
        id: 'patient123',
        name: 'John Doe'
      }
    }
  })
}));

// Mock the appointments data
const mockAppointments = [];

// Mock the patient data - Updated import path
jest.mock('../../../../services/PatientService', () => ({
  getPatientById: jest.fn().mockResolvedValue({
    data: {
      appointments: mockAppointments
    }
  })
}));

describe('PatientDashboard', () => {
  const renderDashboard = () => {
    render(
      <BrowserRouter>
        <PatientDashboard />
      </BrowserRouter>
    );
  };

  it('renders the dashboard header', () => {
    renderDashboard();
    const header = screen.getByText(/Patient Dashboard/i);
    expect(header).toBeInTheDocument();
  });

  it('renders the welcome section', () => {
    renderDashboard();
    const welcomeText = screen.getByText(/Welcome, Patient!/i);
    expect(welcomeText).toBeInTheDocument();
  });
}); 