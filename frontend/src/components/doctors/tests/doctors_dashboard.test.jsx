import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DoctorsDashboard from "../doctors_dashboard";
import '@testing-library/jest-dom';

// Mock useLocation hook
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

describe("DoctorsDashboard", () => {
  it("renders all navigation links in the sidebar", () => {
    render(
      <BrowserRouter>
        <DoctorsDashboard />
      </BrowserRouter>
    );

    // Check if all sidebar navigation links are present
    expect(screen.getByText('Patients')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('View Scan Reports')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    
    // Check if the welcome message is present
    expect(screen.getByText('Welcome, Doctor!')).toBeInTheDocument();
  });
});
