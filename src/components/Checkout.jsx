import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Expiry must be in MM/YY format';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearCart();
      navigate('/success');
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

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
      }}>Checkout</h2>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          marginBottom: '20px', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#2c3e50',
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#ecf0f1',
          borderRadius: '8px'
        }}>
          Total: Rs.{total.toLocaleString()}
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.name}</div>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.email}</div>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Shipping Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {errors.address && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.address}</div>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="cardNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Card Number *</label>
            <input
              id="cardNumber"
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {errors.cardNumber && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.cardNumber}</div>}
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="expiry" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Expiry (MM/YY) *</label>
              <input
                id="expiry"
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.expiry && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.expiry}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="cvv" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>CVV *</label>
              <input
                id="cvv"
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.cvv && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.cvv}</div>}
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            style={{ 
              width: '100%', 
              padding: '15px', 
              backgroundColor: isSubmitting ? '#95a5a6' : '#27ae60',
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer', 
              fontSize: '18px', 
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#219653')}
            onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#27ae60')}
          >
            {isSubmitting ? 'Processing Payment...' : 'Complete Purchase'}
          </button>
          {errors.submit && <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{errors.submit}</div>}
        </form>
      </div>
    </div>
  );
};

export default Checkout;