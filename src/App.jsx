import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { CartProvider, useCart } from './context/CartContext';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';

const CartLink = () => {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Link to="/cart" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
      Cart ({itemCount})
    </Link>
  );
};

const Navigation = ({ currentUser, onLogout }) => {
  return (
    <>
      <header style={{ 
        backgroundColor: '#2c3e50', 
        color: 'white', 
        padding: '15px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
            alt="Bookstore" 
            style={{ 
              width: '30px', 
              height: '30px', 
              borderRadius: '4px',
              objectFit: 'cover'
            }}
          />
          Online Bookstore
        </h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {currentUser && (
            <span style={{ marginRight: '10px', fontSize: '14px' }}>
              Welcome, {currentUser.email}
            </span>
          )}
          {currentUser ? (
            <button 
              onClick={onLogout} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#e74c3c', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#3498db', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </header>
      <nav style={{ 
        backgroundColor: '#34495e', 
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '30px'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>Home</Link>
        <CartLink />
        {currentUser && <Link to="/checkout" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>Checkout</Link>}
      </nav>
    </>
  );
};

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <Navigation currentUser={currentUser} onLogout={handleLogout} />
      
      <main>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            currentUser ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/success" element={
            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              backgroundColor: '#f8f9fa',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '40px', 
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                maxWidth: '500px',
                width: '100%'
              }}>
                <h2 style={{ color: '#27ae60', marginBottom: '20px' }}>Order Successful!</h2>
                <p style={{ fontSize: '18px', color: '#333', marginBottom: '20px' }}>Thank you for your purchase. Your books will be delivered soon!</p>
                <Link to="/" style={{ 
                  padding: '12px 24px', 
                  backgroundColor: '#3498db', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <BookProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BookProvider>
    </Router>
  );
}

export default App;