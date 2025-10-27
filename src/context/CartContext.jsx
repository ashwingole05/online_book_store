import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          ...state,
          items: updatedItems,
          total: parseFloat(newTotal.toFixed(2))
        };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          ...state,
          items: updatedItems,
          total: parseFloat(newTotal.toFixed(2))
        };
      }
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return {
        ...state,
        items: filteredItems,
        total: parseFloat(newTotal.toFixed(2))
      };
    case 'UPDATE_QUANTITY':
      const { id, quantity } = action.payload;
      if (quantity <= 0) return state;
      const updatedQuantities = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const updatedTotal = updatedQuantities.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return {
        ...state,
        items: updatedQuantities,
        total: parseFloat(updatedTotal.toFixed(2))
      };
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (book) => dispatch({ type: 'ADD_ITEM', payload: book });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
