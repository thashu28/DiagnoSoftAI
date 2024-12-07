import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Layout from './layout';

describe('Layout', () => {
  it('renders the main layout with routes', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    
    // Check if the main element exists
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});