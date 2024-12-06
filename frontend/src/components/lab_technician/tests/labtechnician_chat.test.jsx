import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LabTechnicianChat from '../labtechnician_chat';

describe('LabTechnicianChat', () => {
  it('renders the initial chat interface correctly', () => {
    render(<LabTechnicianChat />);
    
    // Check if header is present
    expect(screen.getByText('Lab Technician Dashboard')).toBeInTheDocument();
    
    // Check if both chat options are present
    expect(screen.getByRole('button', { name: /doctor/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /patient/i })).toBeInTheDocument();
  });

  it('handles chat selection and displays appropriate message', () => {
    render(<LabTechnicianChat />);
    
    // Click the Doctor button
    fireEvent.click(screen.getByRole('button', { name: /doctor/i }));
    
    // Check if chat interface appears with correct message
    expect(screen.getByText('Chat with Doctor')).toBeInTheDocument();
    expect(screen.getByText('You are now chatting with a Doctor.')).toBeInTheDocument();
  });

  it('allows sending messages and displays them', () => {
    render(<LabTechnicianChat />);
    
    // Select chat option first
    fireEvent.click(screen.getByRole('button', { name: /patient/i }));
    
    // Type and send a message
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hello, this is a test message' } });
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    // Check if message appears in chat
    expect(screen.getByText('Hello, this is a test message')).toBeInTheDocument();
    
    // Check if input is cleared after sending
    expect(input.value).toBe('');
  });

  it('disables selected chat option button', () => {
    render(<LabTechnicianChat />);
    
    const doctorButton = screen.getByRole('button', { name: /doctor/i });
    fireEvent.click(doctorButton);
    
    // Check if button is disabled after selection
    expect(doctorButton).toBeDisabled();
  });
}); 