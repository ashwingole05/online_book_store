import React from 'react';
import { useBooks } from '../context/BookContext';
import { useCart } from '../context/CartContext';

const BookList = () => {
  const { books } = useBooks();
  const { addItem } = useCart();

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#333',
        fontSize: '28px'
      }}>Popular Books</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {books.map(book => (
          <div key={book.id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              backgroundColor: '#e74c3c', 
              color: 'white', 
              padding: '5px 10px', 
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Bestseller
            </div>
            <h3 style={{ 
              margin: '0 0 10px 0', 
              color: '#2c3e50',
              fontSize: '18px'
            }}>{book.title}</h3>
            <p style={{ 
              margin: '5px 0', 
              color: '#7f8c8d',
              fontStyle: 'italic'
            }}>by {book.author}</p>
            <p style={{ 
              margin: '10px 0', 
              color: '#27ae60', 
              fontWeight: 'bold',
              fontSize: '18px'
            }}>Rs.{book.price.toLocaleString()}</p>
            <p style={{ 
              margin: '10px 0', 
              color: '#95a5a6',
              fontSize: '14px'
            }}>{book.genre}</p>
            <button 
              onClick={() => addItem(book)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;