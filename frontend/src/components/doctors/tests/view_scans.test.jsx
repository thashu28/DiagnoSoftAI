import { render, screen, fireEvent } from "@testing-library/react";
import ViewScanReportsForDoctors from "../view_scans";

describe("ViewScanReportsForDoctors", () => {
  it("renders the list of assigned scans", () => {
    render(<ViewScanReportsForDoctors />);
    expect(screen.getByText(/Assigned Scans/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it("shows scan details when a patient is selected", () => {
    render(<ViewScanReportsForDoctors />);
    fireEvent.click(screen.getByText(/Jane Smith/i));

    expect(screen.getByText("Patient: Jane Smith")).toBeInTheDocument();
    expect(screen.getByText(/No significant anomalies detected/i)).toBeInTheDocument();
  });

  it("allows downloading a report", () => {
    render(<ViewScanReportsForDoctors />);
    const downloadButton = screen.getByText(/Download Report/i);
    expect(downloadButton).toHaveAttribute("href");
  });
});
