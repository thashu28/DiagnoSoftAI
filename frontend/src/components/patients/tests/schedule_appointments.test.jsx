import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ScheduleAppointments from '../schedule_appointments';
import { getAllDoctors } from '../../../../services/DoctorService';

// Mock the DoctorService
jest.mock('../../../../services/DoctorService');

// Mock useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      user: {
        id: 'testUserId'
      }
    }
  })
}));

describe('ScheduleAppointments', () => {
  it('renders the header correctly', async () => {
    // Mock the API response
    getAllDoctors.mockResolvedValue({ data: [] });

    // Render component wrapped in act
    await act(async () => {
      render(
        <BrowserRouter>
          <ScheduleAppointments />
        </BrowserRouter>
      );
    });

    // Test for the presence of the header
    const headerElement = screen.getByText('Patient Dashboard');
    expect(headerElement).toBeInTheDocument();
  });
}); 