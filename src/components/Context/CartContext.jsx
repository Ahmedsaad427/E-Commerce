import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(localCart);
    calculateTotalCartValue(localCart);
  }, []);

  // Helper function to calculate total cart value
  const calculateTotalCartValue = (cartItems) => {
    const totalValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalCartValue(totalValue);
  };

  // Add item to the cart
  const addToCart = (productId, quantity, price, title, imageCover) => {
    const existingItemIndex = cart.findIndex(item => item.product_id === productId);
    let updatedCart;

    if (existingItemIndex >= 0) {
      // If item is already in the cart, update its quantity
      updatedCart = cart.map(item =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // If item is not in the cart, add it with full details
      const newItem = { product_id: productId, quantity, price, title, imageCover };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    calculateTotalCartValue(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update item quantity in the cart
  const updateCartItem = (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.product_id === productId ? { ...item, quantity } : item
    );

    setCart(updatedCart);
    calculateTotalCartValue(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product_id !== productId);

    setCart(updatedCart);
    calculateTotalCartValue(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    setTotalCartValue(0);
    localStorage.removeItem('cart');
  };

  // Check if a product is in the cart
  const isProductInCart = (productId) => {
    return cart.some(item => item.product_id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalCartValue,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
