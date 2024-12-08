import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppointmentSystem from "../appointments";
import { getAllPatients } from "../../../../services/PatientService";
import '@testing-library/jest-dom';

jest.mock("../../../../services/PatientService");

const mockLocation = {
  state: {
    user: {
      id: "doctor123",
      name: "Dr. Smith"
    }
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation
}));

describe('AppointmentSystem', () => {
  it('renders the appointment system with correct data', async () => {
    // Mock the API response
    const mockPatients = [{
      _id: 'patient123',
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      appointments: [{
        _id: "apt123",
        doctor: "doctor123",
        date: "2024-03-25",
        time: "10:00 AM",
        condition: "Critical"
      }]
    }];

    getAllPatients.mockResolvedValue({ data: mockPatients });

    render(
      <BrowserRouter>
        <AppointmentSystem />
      </BrowserRouter>
    );

    // Wait for and verify the header
    await waitFor(() => {
      expect(screen.getByText('Appointments')).toBeInTheDocument();
    });

    // Verify that Critical condition appears
    const criticalElements = await screen.findAllByText('Critical');
    expect(criticalElements.length).toBeGreaterThan(0);
  });
}); 