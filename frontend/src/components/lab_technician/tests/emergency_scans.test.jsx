import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmergencyScans from '../emergency_scans';

describe('EmergencyScans', () => {
  it('shows validation message when submitting without required fields', () => {
    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    
    // Render component
    render(<EmergencyScans />);
    
    // Find submit button and get its form
    const submitButton = screen.getByRole('button', { name: /upload emergency scan/i });
    const form = submitButton.closest('form');
    fireEvent.submit(form);
    
    // Check if alert was called with correct message
    expect(alertMock).toHaveBeenCalledWith('Please fill all fields and upload a scan file.');
    
    // Clean up mock
    alertMock.mockRestore();
  });
});
