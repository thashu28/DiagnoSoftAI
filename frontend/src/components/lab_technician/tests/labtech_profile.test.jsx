import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LabTechnicianProfile from '../labtech_profile';

// Mock the LabtechService
jest.mock('../../../../services/LabtechService', () => ({
  getLabTechById: jest.fn()
}));

// Mock useLocation
const mockLocation = {
  state: {
    user: {
      id: 'testLabTechId',
      name: 'Test Lab Tech'
    }
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
  useNavigate: () => jest.fn()
}));

describe('LabTechnicianProfile', () => {
  it('displays loading state initially', () => {
    render(
      <BrowserRouter>
        <LabTechnicianProfile />
      </BrowserRouter>
    );
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
}); 