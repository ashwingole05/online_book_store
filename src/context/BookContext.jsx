import React, { createContext, useContext, useState } from 'react';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books] = useState([
    { id: 1, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: 399, genre: 'Personal Finance' },
    { id: 2, title: 'Artificial Intelligence', author: 'Stuart Russell', price: 1299, genre: 'Technology' },
    { id: 3, title: 'The Psychology of Money', author: 'Morgan Housel', price: 499, genre: 'Psychology' },
    { id: 4, title: 'Atomic Habits', author: 'James Clear', price: 599, genre: 'Self-Help' },
    { id: 5, title: 'Think and Grow Rich', author: 'Napoleon Hill', price: 349, genre: 'Motivational' },
    { id: 6, title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', price: 699, genre: 'Self-Help' },
    { id: 7, title: 'Mindset: The New Psychology of Success', author: 'Carol Dweck', price: 549, genre: 'Psychology' }
  ]);

  return (
    <BookContext.Provider value={{ books }}>
      {children}
    </BookContext.Provider>
  );
};