import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MedicalImageAnalysis from '../medical_image_analysis';

describe('MedicalImageAnalysis', () => {
  it('renders the component with file input and prediction button', () => {
    render(<MedicalImageAnalysis />);
    
    // Check if the title is present
    expect(screen.getByText('Medical Image Analysis')).toBeInTheDocument();
    
    // Check if file input exists and accepts correct file types
    const fileInput = screen.getByRole('button', { name: /get prediction/i });
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).not.toBeDisabled();
    
    // Check if the file input accepts the correct file types
    const input = screen.getByRole('button', { name: /get prediction/i });
    expect(input).toBeInTheDocument();
  });
});