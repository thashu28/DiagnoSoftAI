import { render, screen } from "@testing-library/react";
import DoctorDashboard from "../doctors_dashboard";

describe("DoctorDashboard", () => {
  // Test case to verify that the overview cards are rendered on the dashboard
  it("renders overview cards", () => {
    render(<DoctorDashboard />);
    expect(screen.getByText(/Emergency Cases/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Reports/i)).toBeInTheDocument();
  });
  // Test case to verify that the "Assigned Scans" table is displayed with relevant data
  it("shows assigned scans table", () => {
    render(<DoctorDashboard />);
    expect(screen.getByText(/Assigned Scans/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/CT Scan/i)).toBeInTheDocument();
  });
});
