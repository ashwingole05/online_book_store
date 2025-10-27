import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import Cart from '../../components/Cart';

const Providers = ({ children }) => (
  <BrowserRouter>
    <CartProvider>
      {children}
    </CartProvider>
  </BrowserRouter>
);

describe('Cart Component', () => {
  test('displays empty cart message', () => {
    render(
      <Providers>
        <Cart />
      </Providers>
    );
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  test('displays shopping cart header', () => {
    render(
      <Providers>
        <Cart />
      </Providers>
    );
    expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
  });
});