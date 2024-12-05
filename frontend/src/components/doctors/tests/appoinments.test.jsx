import { render, screen, fireEvent } from "@testing-library/react";
import AppointmentSystem from "../appointments";

 // Test case to check if the appointment list renders correctly
describe("AppointmentSystem", () => {
  it("renders the appointments list", () => {
    render(<AppointmentSystem />);
    const appointmentHeaders = screen.getAllByText(/Condition:/i);
    expect(appointmentHeaders.length).toBeGreaterThan(0);
  });

  // Test case to verify that clicking an appointment displays its details
  it("displays selected appointment details", () => {
    render(<AppointmentSystem />);
    const appointmentItem = screen.getByText("John Doe");
    fireEvent.click(appointmentItem);

    // Check that the selected appointment's details are displayed correctly
    expect(screen.getByText("Patient: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Date: 2024-11-25")).toBeInTheDocument();
    expect(screen.getByText("Time: 10:00 AM")).toBeInTheDocument();
    expect(screen.getByText(/Critical/i)).toHaveClass("text-red-500");
  });

  // Test case to verify that rescheduling functionality works correctly
  it("allows rescheduling of an appointment", () => {
    render(<AppointmentSystem />);
    const dateInput = screen.getByPlaceholderText("Select new date");
    const timeInput = screen.getByPlaceholderText("Select new time");
    const rescheduleButton = screen.getByText(/Reschedule Appointment/i);

    fireEvent.change(dateInput, { target: { value: "2024-11-30" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.click(rescheduleButton);

     // Verify that the appointment details are updated with the new date and time
    expect(screen.getByText("Date: 2024-11-30")).toBeInTheDocument();
    expect(screen.getByText("Time: 3:00 PM")).toBeInTheDocument();
  });
});
