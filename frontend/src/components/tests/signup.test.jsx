import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignupPage from '../signup';
import { signup } from '../../../services/authservice';
import '@testing-library/jest-dom';

jest.mock('../../../services/authservice');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignupPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderSignupPage = () => {
    render(
      <BrowserRouter>
        <SignupPage />
      </BrowserRouter>
    );
  };

  it('handles successful patient signup', async () => {
    const mockResponse = {
      success: true,
      token: 'mock-token',
      user: {
        role: 'patient',
        id: '123',
        name: 'John Doe',
        email: 'john@example.com'
      }
    };

    signup.mockResolvedValueOnce(mockResponse);
    renderSignupPage();

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/role/i), { target: { value: 'patient' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText(/blood type/i), { target: { value: 'A+' } });

    fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        phone: '1234567890',
        role: 'patient',
        age: '30',
        gender: 'male',
        bloodType: 'A+'
      });
    });

    expect(screen.getByText('Signup successful!')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderSignupPage();
    
    fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      const requiredFields = screen.getAllByRole('textbox');
      requiredFields.forEach(field => {
        expect(field).toBeInvalid();
      });
    });
  });

});
