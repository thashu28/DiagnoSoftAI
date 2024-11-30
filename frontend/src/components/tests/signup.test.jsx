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

  it('handles input changes', () => {
    renderSignupPage();
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const roleSelect = screen.getByLabelText(/role/i);
    const ageInput = screen.getByLabelText(/age/i);
    const genderSelect = screen.getByLabelText(/gender/i);
    const bloodTypeSelect = screen.getByLabelText(/blood type/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(roleSelect, { target: { value: 'patient' } });
    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.change(genderSelect, { target: { value: 'male' } });
    fireEvent.change(bloodTypeSelect, { target: { value: 'A+' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
    expect(phoneInput).toHaveValue('1234567890');
    expect(roleSelect).toHaveValue('patient');
    expect(ageInput).toHaveValue(30);
    expect(genderSelect).toHaveValue('male');
    expect(bloodTypeSelect).toHaveValue('A+');
  });

});
