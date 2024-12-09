import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PatientResults from '../patients_results';
import { getAllPatients } from '../../../../services/PatientService';

// Mock the PatientService
jest.mock('../../../../services/PatientService', () => ({
  getAllPatients: jest.fn(),
  getPatientById: jest.fn()
}));

describe('PatientResults', () => {
  it('renders search bar and handles search input', () => {
    // Mock the getAllPatients response
    getAllPatients.mockResolvedValue({
      data: [
        {
          _id: '1',
          name: 'John Doe',
          age: 30,
          appointments: [{ condition: 'Stable' }]
        }
      ]
    });

    // Render the component
    render(<PatientResults />);

    // Check if the search bar is rendered
    const searchInput = screen.getByPlaceholderText('Search patients by name...');
    expect(searchInput).toBeInTheDocument();

    // Simulate user typing in search
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput.value).toBe('John');

    // Check if the header is rendered
    expect(screen.getByText('Patient Results')).toBeInTheDocument();
    
    // Check if the website name is rendered
    expect(screen.getByText('DiagnoSoftAI')).toBeInTheDocument();
  });
});
