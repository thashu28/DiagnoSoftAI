import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ViewScanReportsForDoctors from "../view_scans";
import { getAllPatients } from "../../../../services/PatientService";

// Mock the PatientService
jest.mock("../../../../services/PatientService");

// Mock useLocation
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
  useLocation: () => mockLocation,
  useNavigate: () => jest.fn()
}));

describe('ViewScanReportsForDoctors', () => {
  it('displays no scans message when there are no assigned scans', async () => {
    // Mock the API response with empty data
    getAllPatients.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <ViewScanReportsForDoctors />
      </BrowserRouter>
    );

    // Check if the "no scans" message is displayed
    const noScansMessage = await screen.findByText('No assigned scans available...');
    expect(noScansMessage).toBeInTheDocument();
  });
});
