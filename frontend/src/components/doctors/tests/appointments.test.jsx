// import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import AppointmentSystem from "../appointments";
// import { getAllPatients } from "../../../../services/PatientService";
// import '@testing-library/jest-dom';

// // Mock the PatientService
// jest.mock("../../../../services/PatientService");

// // Mock the location state
// const mockLocation = {
//   state: {
//     user: {
//       id: "doctor123",
//       name: "Dr. Smith"
//     }
//   }
// };

// // Mock useLocation hook
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useLocation: () => mockLocation
// }));

// describe('AppointmentSystem', () => {
//   const mockAppointments = [
//     {
//       _id: "apt123",
//       patientName: "John Doe",
//       date: "2024-03-25",
//       time: "10:00 AM",
//       condition: "Critical",
//       doctor: "doctor123"
//     },
//     {
//       _id: "apt124",
//       patientName: "Jane Smith",
//       date: "2024-03-26",
//       time: "11:00 AM",
//       condition: "Stable",
//       doctor: "doctor123"
//     }
//   ];

//   beforeEach(() => {
//     getAllPatients.mockResolvedValue({
//       data: [{
//         _id: "patient123",
//         name: "John Doe",
//         appointments: mockAppointments
//       }]
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders the appointment system header', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     expect(screen.getByText('Appointments')).toBeInTheDocument();
//     await waitFor(() => {
//       expect(getAllPatients).toHaveBeenCalled();
//     });
//   });

//   it('displays appointments for the logged-in doctor', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//       expect(screen.getByText('Critical')).toBeInTheDocument();
//       expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
//     });
//   });

//   it('allows selecting an appointment and shows details', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     await waitFor(() => {
//       const appointmentCard = screen.getByText('John Doe').closest('div');
//       fireEvent.click(appointmentCard);
//     });

//     expect(screen.getByText('Appointment Details')).toBeInTheDocument();
//     expect(screen.getByText(/Patient: John Doe/)).toBeInTheDocument();
//     expect(screen.getByText(/Date: 2024-03-25/)).toBeInTheDocument();
//     expect(screen.getByText(/Time: 10:00 AM/)).toBeInTheDocument();
//     expect(screen.getByText('Critical')).toHaveClass('text-red-500');
//   });

//   it('handles appointment rescheduling with valid inputs', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     await waitFor(() => {
//       const appointmentCard = screen.getByText('John Doe').closest('div');
//       fireEvent.click(appointmentCard);
//     });

//     const dateInput = screen.getByRole('date');
//     const timeInput = screen.getByRole('time');
    
//     await act(async () => {
//       fireEvent.change(dateInput, { target: { value: '2024-04-01' } });
//       fireEvent.change(timeInput, { target: { value: '14:00' } });
//     });
    
//     const rescheduleButton = screen.getByRole('button', { name: /reschedule appointment/i });
//     fireEvent.click(rescheduleButton);

//     expect(screen.getByText(/Appointment for John Doe rescheduled./i)).toBeInTheDocument();
//   });

//   it('shows validation error when rescheduling without required fields', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     await waitFor(() => {
//       const appointmentCard = screen.getByText('John Doe').closest('div');
//       fireEvent.click(appointmentCard);
//     });

//     const rescheduleButton = screen.getByRole('button', { name: /reschedule appointment/i });
//     fireEvent.click(rescheduleButton);

//     expect(screen.getByText('Please select both date and time to reschedule.')).toBeInTheDocument();
//   });

//   it('handles chat message sending', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     const messageInput = screen.getByPlaceholderText('Type a message...');
//     await act(async () => {
//       fireEvent.change(messageInput, { target: { value: 'Hello patient' } });
//     });
    
//     const sendButton = screen.getByRole('button', { name: /send/i });
//     fireEvent.click(sendButton);

//     expect(screen.getByText('Hello patient')).toBeInTheDocument();
//     expect(messageInput).toHaveValue('');
//   });

//   it('displays empty chat message when no messages exist', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     expect(screen.getByText('No messages yet. Start a conversation!')).toBeInTheDocument();
//   });

//   it('handles error when fetching patients fails', async () => {
//     const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
//     getAllPatients.mockRejectedValueOnce(new Error('Failed to fetch'));

//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     await waitFor(() => {
//       expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching patients:', expect.any(Error));
//     });

//     consoleErrorSpy.mockRestore();
//   });

//   it('displays multiple appointments for the doctor', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//       expect(screen.getByText('Jane Smith')).toBeInTheDocument();
//     });
//   });

//   it('highlights selected appointment', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <AppointmentSystem />
//         </BrowserRouter>
//       );
//     });

//     await waitFor(() => {
//       const appointmentCard = screen.getByText('John Doe').closest('div');
//       fireEvent.click(appointmentCard);
//       expect(appointmentCard).toHaveClass('border-2 border-blue-300 bg-blue-50');
//     });
//   });
// }); 