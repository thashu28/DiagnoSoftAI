import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PatientChat from '../patient_chat';

// Mock the MedicalChatbot component since we're only testing PatientChat
jest.mock('../MedicalChatbot', () => {
  return function MockMedicalChatbot() {
    return <div data-testid="medical-chatbot">Medical Chatbot Mock</div>;
  };
});

describe('PatientChat', () => {
  it('renders the patient chat interface with all main components', () => {
    render(<PatientChat />);
    
    // Check if header is present
    expect(screen.getByText('Patient Dashboard')).toBeInTheDocument();
    
    // Check if the Medical Assistant title is present
    expect(screen.getByText('Medical Assistant')).toBeInTheDocument();
    
    // Check if the MedicalChatbot component is rendered
    expect(screen.getByTestId('medical-chatbot')).toBeInTheDocument();
    
    // Check if footer is present
    expect(screen.getByText('© 2024 Diagnosoft AI. All Rights Reserved.')).toBeInTheDocument();
  });
}); 