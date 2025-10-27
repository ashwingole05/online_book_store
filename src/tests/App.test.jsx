import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  test('renders the app header', () => {
    render(<App />);
    expect(screen.getByText('Online Bookstore')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('displays login button when not authenticated', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});