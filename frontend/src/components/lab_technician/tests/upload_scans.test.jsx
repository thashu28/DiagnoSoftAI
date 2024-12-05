import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LabTechnicianUploadScans from '../upload_scans';

// Mock the PatientService with correct path
jest.mock('../../../../services/PatientService', () => ({
  getAllPatients: jest.fn().mockResolvedValue({ data: [] }),
  addMRIScan: jest.fn()
}));

describe('LabTechnicianUploadScans', () => {
  it('renders the dashboard header and form', () => {
    render(<LabTechnicianUploadScans />);
    
    // Check if header is present
    expect(screen.getByText('Lab Technician Dashboard')).toBeInTheDocument();
    
    // Check if form title is present
    expect(screen.getByText('Upload a New Scan')).toBeInTheDocument();
  });
}); 