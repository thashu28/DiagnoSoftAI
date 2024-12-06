import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ViewScanReportsForDoctors from "../view_scans";

describe('ViewScanReportsForDoctors', () => {
  it('renders the patient list with correct information', () => {
    render(<ViewScanReportsForDoctors />);
    
    // Check if both patients from static data are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check if conditions are displayed (verify count of conditions)
    const criticalElements = screen.getAllByText(/Critical/);
    const stableElements = screen.getAllByText(/Stable/);
    expect(criticalElements).toHaveLength(2); // One in sidebar, one in header
    expect(stableElements).toHaveLength(1);
    
    // Check if the main section headers are present
    expect(screen.getByText('Assigned Scans')).toBeInTheDocument();
    expect(screen.getByText('Scan Details')).toBeInTheDocument();
    expect(screen.getByText('AI Analysis')).toBeInTheDocument();
  });
});
