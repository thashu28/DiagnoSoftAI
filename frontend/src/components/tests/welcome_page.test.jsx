import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import WelcomePage from '../welcome_page';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('WelcomePage', () => {
  it('navigates to login page when login button is clicked', async () => {
    // Mock timer functions
    jest.useFakeTimers();
    
    render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );
    
    // Find and click the login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    
    // Fast-forward timers
    jest.advanceTimersByTime(1000);
    
    // Wait for navigation to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
    
    // Clean up
    jest.useRealTimers();
  });
}); 