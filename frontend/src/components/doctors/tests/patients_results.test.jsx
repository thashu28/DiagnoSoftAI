import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import PatientResults from "../patients_results";

describe("PatientResults", () => {
  it("renders the patient results table with correct headers", () => {
    render(<PatientResults />);
    
    // Check if the main title is present
    expect(screen.getByText("Patient Results")).toBeInTheDocument();
    
    // Check if all table headers are present
    expect(screen.getByText("Patient")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Condition")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    
    // Check if sample patient data is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
