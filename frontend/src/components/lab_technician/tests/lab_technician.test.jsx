import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LabTechnicianDashboard from '../lab_technician';
import { getAllPatients } from '../../../../services/PatientService';

// Mock the PatientService
jest.mock('../../../../services/PatientService');

describe('LabTechnicianDashboard', () => {
  it('renders pending test reports section correctly', async () => {
    // Mock the getAllPatients response with complete data structure
    const mockPatients = [{
      name: 'John Doe',
      mriScans: [{
        scanType: 'Brain MRI',
        status: 'Pending',
        uploadDate: '2024-03-20'
      }],
      testReports: [{
        testType: 'Blood Test',
        status: 'Pending',
        uploadDate: '2024-03-20'
      }]
    }];

    getAllPatients.mockResolvedValue({ data: mockPatients });

    // Render the component within Router context
    render(
      <BrowserRouter>
        <LabTechnicianDashboard />
      </BrowserRouter>
    );

    // Wait for the component to render and data to load
    await waitFor(() => {
      // Check if the main sections are rendered
      expect(screen.getByText('Lab Technician Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Pending Test Reports')).toBeInTheDocument();
      
      // Verify patient data appears twice (once in each section)
      const patientNames = screen.getAllByText('John Doe');
      expect(patientNames).toHaveLength(2);
      
      // Verify test report details
      expect(screen.getByText('Blood Test')).toBeInTheDocument();
      
      // Verify scan details
      expect(screen.getByText('Brain MRI')).toBeInTheDocument();
    });
  });
}); 