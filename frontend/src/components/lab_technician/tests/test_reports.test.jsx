import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LabTechniciansTestReports from '../test_reports';

// Mock the PatientService with correct path
jest.mock('../../../../services/PatientService', () => ({
  getAllPatients: jest.fn().mockResolvedValue({
    data: []
  }),
  addTestReport: jest.fn()
}));

describe('LabTechniciansTestReports', () => {
  it('renders the dashboard header', () => {
    render(<LabTechniciansTestReports />);
    
    // Check if the header text is present
    const headerElement = screen.getByText('Lab Technician Dashboard');
    expect(headerElement).toBeInTheDocument();
  });
});