import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import DoctorProfile from '../doctor_profile';
import { getDoctorById } from '../../../../services/DoctorService';

// Mock the DoctorService
jest.mock('../../../../services/DoctorService');

// Mock useLocation and useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      user: {
        id: 'testDoctorId'
      }
    }
  }),
  useNavigate: () => mockNavigate
}));

describe('DoctorProfile', () => {
  it('renders doctor profile with data', async () => {
    // Mock the doctor data response
    const mockDoctorData = {
      name: 'Dr. John Smith',
      experience: '10 years',
      email: 'dr.smith@example.com',
      phone: '123-456-7890',
      qualifications: ['MD', 'PhD']
    };

    // Setup the mock response
    getDoctorById.mockResolvedValue({ data: mockDoctorData });

    // Render the component
    render(
      <BrowserRouter>
        <DoctorProfile />
      </BrowserRouter>
    );

    // Verify loading state is shown initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
}); 