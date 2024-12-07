import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ViewReports from '../view_reports';
import { getPatientById } from '../../../../services/PatientService';
import '@testing-library/jest-dom';

// Mock the PatientService
jest.mock('../../../../services/PatientService');

describe('ViewReports', () => {
  it('displays no reports message when there are no reports', async () => {
    // Mock the useLocation hook
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        state: {
          user: {
            id: '123'
          }
        }
      })
    }));

    // Mock the API response
    getPatientById.mockResolvedValue({
      data: {
        testReports: []
      }
    });

    // Render the component
    render(
      <BrowserRouter>
        <ViewReports />
      </BrowserRouter>
    );

    // Check for the "no reports" message
    const noReportsMessage = await screen.findByText('No reports available at the moment.');
    expect(noReportsMessage).toBeInTheDocument();
  });
}); 