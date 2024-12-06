import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../login';
import { login } from '../../../services/authservice';

// Mock the authservice
jest.mock('../../../services/authservice');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  // Helper function to render the LoginPage component with routing context
  const renderLoginPage = () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };
  // Test case: Verifies input field changes
  it('handles input changes', () => {
    renderLoginPage();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  // Test case: Handles successful login for a doctor
  it('handles successful doctor login', async () => {
    const mockResponse = {
      success: true,
      token: 'mock-token',
      user: {
        role: 'doctor',
        id: '123',
        name: 'Dr. Smith',
        email: 'doctor@example.com'
      }
    };

    login.mockResolvedValueOnce(mockResponse);
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'doctor@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'doctor@example.com',
        password: 'password123'
      });
      expect(mockNavigate).toHaveBeenCalledWith('/doctors_dashboard', { 
        state: { user: mockResponse.user } 
      });
      expect(localStorage.getItem('authToken')).toBe('mock-token');
    });
  });
  
  // Test case: Handles successful login for a patient
  it('handles successful patient login', async () => {
    const mockResponse = {
      success: true,
      token: 'mock-token',
      user: {
        role: 'patient',
        id: '456',
        name: 'John Doe',
        email: 'patient@example.com'
      }
    };

    login.mockResolvedValueOnce(mockResponse);
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'patient@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/patients_dashboard', { 
        state: { user: mockResponse.user } 
      });
    });
  });
});
