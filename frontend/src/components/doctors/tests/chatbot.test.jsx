import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatSystem from '../chatbot';

describe('ChatSystem', () => {
  it('renders role selection buttons correctly', () => {
    render(<ChatSystem />);
    
    // Check if all three role buttons are present
    const doctorButton = screen.getByRole('button', { name: /doctor/i });
    const patientButton = screen.getByRole('button', { name: /patient/i });
    const labTechButton = screen.getByRole('button', { name: /lab technician/i });
    
    // Verify buttons are in the document
    expect(doctorButton).toBeInTheDocument();
    expect(patientButton).toBeInTheDocument();
    expect(labTechButton).toBeInTheDocument();
    
    // Verify buttons have correct styling classes
    expect(doctorButton).toHaveClass('bg-blue-200');
    expect(patientButton).toHaveClass('bg-green-200');
    expect(labTechButton).toHaveClass('bg-yellow-200');
  });
});
