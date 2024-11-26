import { render, screen, fireEvent } from "@testing-library/react";
import PatientResults from "../patients_results";

describe("PatientResults", () => {
  it("renders the results list", () => {
    render(<PatientResults />);
    expect(screen.getByText(/All Patient Results/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
  });

  it("displays detailed results when a patient is selected", () => {
    render(<PatientResults />);
    fireEvent.click(screen.getByText(/View Details/i));

    expect(screen.getByText("Jane Smith's Results")).toBeInTheDocument();
    expect(screen.getByText("Age: 32")).toBeInTheDocument();
    expect(screen.getByText(/CT Scan/i)).toBeInTheDocument();
  });
});
