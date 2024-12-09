import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PatientProfile from '../patient_profile';

// Mock the PatientService
jest.mock('../../../../services/PatientService', () => ({
  getPatientById: jest.fn()
}));

// Mock useLocation
const mockLocation = {
  state: {
    user: {
      id: 'testPatientId',
      name: 'Test Patient'
    }
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
  useNavigate: () => jest.fn()
}));

describe('PatientProfile', () => {
  it('displays loading state initially', () => {
    render(
      <BrowserRouter>
        <PatientProfile />
      </BrowserRouter>
    );
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
}); 