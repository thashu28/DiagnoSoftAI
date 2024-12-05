import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppointmentSystem from "../appointments";
import { getAllPatients } from "../../../../services/PatientService";
import '@testing-library/jest-dom';

// Mock the PatientService
jest.mock("../../../../services/PatientService");

// Mock the location state
const mockLocation = {
  state: {
    user: {
      id: "doctor123",
      name: "Dr. Smith"
    }
  }
};

// Mock useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation
}));

describe('AppointmentSystem', () => {
  it('displays appointments for the logged-in doctor', async () => {
    // Mock the API response
    const mockPatients = [{
      appointments: [{
        _id: "apt123",
        patientName: "John Doe",
        date: "2024-03-25",
        time: "10:00 AM",
        condition: "Critical",
        doctor: "doctor123"
      }]
    }];

    getAllPatients.mockResolvedValue({ data: mockPatients });

    // Render the component
    render(
      <BrowserRouter>
        <AppointmentSystem />
      </BrowserRouter>
    );

    // Wait for the appointments to be displayed
    await waitFor(() => {
      // Check if patient name is displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      // Check if appointment time is displayed
      expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
      // Check if condition is displayed
      expect(screen.getByText("Critical")).toBeInTheDocument();
    });
  });
}); 