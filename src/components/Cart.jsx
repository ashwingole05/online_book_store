import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, total, updateQuantity, removeItem } = useCart();

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
      }}>Your Shopping Cart</h2>
      {items.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          fontSize: '20px', 
          color: '#7f8c8d',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <p>Your cart is empty. Start shopping!</p>
          <Link to="/" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Browse Books
          </Link>
        </div>
      ) : (
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          {items.map(item => (
            <div key={item.id} style={{ 
              border: '1px solid #eee', 
              padding: '20px', 
              marginBottom: '15px',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '20px',
              alignItems: 'center',
              backgroundColor: '#f9f9f9'
            }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: '20px' }}>
                  {item.title}
                </h4>
                <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '16px' }}>
                  by {item.author}
                </p>
                <p style={{ margin: '5px 0', color: '#95a5a6', fontSize: '14px' }}>
                  Genre: {item.genre}
                </p>
                <p style={{ margin: '8px 0 0 0', color: '#27ae60', fontWeight: 'bold', fontSize: '18px' }}>
                  Rs.{item.price.toLocaleString()} each
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    −
                  </button>
                  <span style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    minWidth: '40px', 
                    textAlign: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    border: '2px solid #ddd'
                  }}>
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      backgroundColor: '#27ae60',
                      color: 'white',
                      border: 'none',
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    +
                  </button>
                </div>
                
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  padding: '8px 16px',
                  backgroundColor: '#ecf0f1',
                  borderRadius: '5px'
                }}>
                  Subtotal: Rs.{(item.price * item.quantity).toLocaleString()}
                </div>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  style={{
                    backgroundColor: '#c0392b',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a93226'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#34495e',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '24px',
            marginTop: '20px'
          }}>
            <span>Total Amount:</span>
            <span>Rs.{total.toLocaleString()}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            marginTop: '20px',
            justifyContent: 'space-between'
          }}>
            <Link to="/" style={{ textDecoration: 'none', flex: 1 }}>
              <button style={{
                width: '100%',
                padding: '15px 30px',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7f8c8d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#95a5a6'}>
                Continue Shopping
              </button>
            </Link>
            <Link to="/checkout" style={{ textDecoration: 'none', flex: 1 }}>
              <button style={{
                width: '100%',
                padding: '15px 30px',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#219653'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;