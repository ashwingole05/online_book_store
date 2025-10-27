import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import Checkout from '../../components/Checkout';

const Providers = ({ children }) => (
  <BrowserRouter>
    <CartProvider>
      {children}
    </CartProvider>
  </BrowserRouter>
);

describe('Checkout Component', () => {
  test('renders checkout form', () => {
    render(
      <Providers>
        <Checkout />
      </Providers>
    );
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
  });

  test('displays all form fields', () => {
    render(
      <Providers>
        <Checkout />
      </Providers>
    );
    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Shipping Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Number *')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry (MM/YY) *')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV *')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(
      <Providers>
        <Checkout />
      </Providers>
    );
    
    const submitButton = screen.getByText('Complete Purchase');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    render(
      <Providers>
        <Checkout />
      </Providers>
    );
    
    const emailInput = screen.getByLabelText('Email *');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText('Complete Purchase');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  test('displays total amount', () => {
    render(
      <Providers>
        <Checkout />
      </Providers>
    );
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });
});