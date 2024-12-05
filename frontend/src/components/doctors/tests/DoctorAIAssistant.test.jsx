import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DoctorAIAssistant from '../DoctorAIAssistant';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock axios
jest.mock('axios');

describe('DoctorAIAssistant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the user data
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'user') {
        return JSON.stringify({ id: 'doctor123' });
      }
      if (key === 'doctorChatHistory_doctor123') {
        return JSON.stringify([{
          id: 'default',
          title: 'New conversation',
          messages: [{
            sender: 'bot',
            text: 'Hello Doctor! I am your medical AI assistant. How can I help you today?',
            timestamp: new Date().toLocaleTimeString()
          }]
        }]);
      }
      return null;
    });
  });

  it('renders the input field', () => {
    render(<DoctorAIAssistant />);
    const inputField = screen.getByPlaceholderText('Type your message...');
    expect(inputField).toBeInTheDocument();
  });
});
