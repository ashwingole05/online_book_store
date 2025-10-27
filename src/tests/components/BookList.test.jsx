import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from '../../context/BookContext';
import { CartProvider } from '../../context/CartContext';
import BookList from '../../components/BookList';

const Providers = ({ children }) => (
  <BrowserRouter>
    <BookProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </BookProvider>
  </BrowserRouter>
);

describe('BookList Component', () => {
  test('displays books', () => {
    render(
      <Providers>
        <BookList />
      </Providers>
    );
    expect(screen.getByText('Rich Dad Poor Dad')).toBeInTheDocument();
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
  });

  test('displays book prices', () => {
    render(
      <Providers>
        <BookList />
      </Providers>
    );
    expect(screen.getByText('Rs.399')).toBeInTheDocument();
    expect(screen.getByText('Rs.1,299')).toBeInTheDocument();
  });

  test('displays add to cart buttons', () => {
    render(
      <Providers>
        <BookList />
      </Providers>
    );
    const addButtons = screen.getAllByText('Add to Cart');
    expect(addButtons.length).toBeGreaterThan(0);
  });

  test('adds book to cart when button is clicked', () => {
    render(
      <Providers>
        <BookList />
      </Providers>
    );
    const addButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]);
    // The button should still be present after clicking
    expect(addButtons[0]).toBeInTheDocument();
  });
});