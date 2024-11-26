import { render, screen, fireEvent } from "@testing-library/react";
import AppointmentSystem from "../appointments";

describe("AppointmentSystem", () => {
  it("renders the appointments list", () => {
    render(<AppointmentSystem />);
    const appointmentHeaders = screen.getAllByText(/Condition:/i);
    expect(appointmentHeaders.length).toBeGreaterThan(0);
  });

  it("displays selected appointment details", () => {
    render(<AppointmentSystem />);
    const appointmentItem = screen.getByText("John Doe");
    fireEvent.click(appointmentItem);

    expect(screen.getByText("Patient: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Date: 2024-11-25")).toBeInTheDocument();
    expect(screen.getByText("Time: 10:00 AM")).toBeInTheDocument();
    expect(screen.getByText(/Critical/i)).toHaveClass("text-red-500");
  });

  it("allows rescheduling of an appointment", () => {
    render(<AppointmentSystem />);
    const dateInput = screen.getByPlaceholderText("Select new date");
    const timeInput = screen.getByPlaceholderText("Select new time");
    const rescheduleButton = screen.getByText(/Reschedule Appointment/i);

    fireEvent.change(dateInput, { target: { value: "2024-11-30" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.click(rescheduleButton);

    expect(screen.getByText("Date: 2024-11-30")).toBeInTheDocument();
    expect(screen.getByText("Time: 3:00 PM")).toBeInTheDocument();
  });
});
