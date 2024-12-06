import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PatientViewScans from '../view_scans';
import { getPatientById } from '../../../../services/PatientService';

// Mock the PatientService
jest.mock('../../../../services/PatientService');

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
  useLocation: () => mockLocation
}));

describe('PatientViewScans', () => {
  const mockScans = [
    {
      id: '1',
      scanType: 'Brain MRI',
      description: 'Routine brain scan',
      status: 'Completed',
      requestedBy: 'Dr. Smith',
      uploadDate: '2024-03-20',
      comments: 'Normal results',
      fileUrl: 'https://example.com/scan1'
    },
    {
      id: '2',
      scanType: 'Chest X-Ray',
      description: 'Annual checkup',
      status: 'Pending',
      requestedBy: 'Dr. Johnson',
      uploadDate: '2024-03-21',
      comments: 'Awaiting analysis'
    }
  ];

  beforeEach(() => {
    getPatientById.mockResolvedValue({ data: { mriScans: mockScans } });
  });

  it('renders scans and handles search functionality', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <PatientViewScans />
        </BrowserRouter>
      );
    });

    // Check if the header is rendered
    expect(screen.getByText('Patient Dashboard')).toBeInTheDocument();

    // Wait for scans to be loaded
    const brainScan = await screen.findByText('Brain MRI');
    expect(brainScan).toBeInTheDocument();

    // Test search functionality
    const searchInput = screen.getByPlaceholderText('Search by scan type or description...');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'chest' } });
    });

    // Check if filtering works
    expect(screen.queryByText('Brain MRI')).not.toBeInTheDocument();
    expect(screen.getByText('Chest X-Ray')).toBeInTheDocument();
  });
}); 