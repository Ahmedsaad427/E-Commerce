import React, { useContext } from 'react';
import { CartContext } from './../Context/CartContext';
import { ProductContext } from './../Context/ProductIDcontext';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { setSelectedProductId } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    navigate('/productdetails');
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-50 p-10">
      <div className="titled flex flex-wrap justify-between">
        <div className="1">
          <span className="fa-solid fa-shopping-cart ml-6 text-5xl cursor-pointer text-green-600"></span>
          <span className="text-4xl font-bold mb-8 ml-2 text-gray-900">My Cart</span>
        </div>
        {cart.length > 0 && (
          <button
            onClick={handleClearCart}
            className="bg-red-500 hover:bg-red-700 w-1/6 text-center ml-10 mb-4 py-2 text-white transition-colors duration-300 ease-in-out rounded"
          >
            Clear Cart
          </button>
        )}
      </div>
      <div className="all">
        {cart.length > 0 ? (
          <>
            {cart.map((product) => (
              <div
                className="flex items-center mb-8 p-4 rounded-lg shadow-sm cursor-pointer"
                key={product.product_id}
                onClick={() => handleProductClick(product.product_id)}
              >
                <img src={product.imageCover} alt={product.title} className="w-36 h-36 object-cover rounded-lg mr-6" />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-green-500 font-medium text-lg">{product.price} EGP</p>
                  <p className="text-gray-700 font-medium text-lg">Quantity: {product.quantity}</p>
                  <button
                    className="text-red-500 mt-2 flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(product.product_id);
                    }}
                  >
                    <i className="fa-solid fa-trash mr-2"></i> Remove
                  </button>
                </div>
              </div>
            ))}
            <NavLink to="/Checkout">
            <button
              className="bg-green-500 hover:bg-green-700 w-1/6 text-center ml-10 mb-4 py-2 text-white transition-colors duration-300 ease-in-out rounded"
            >
              Check Out
            </button>
            </NavLink>
          </>
        ) : (
          <p className="text-lg text-gray-700">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
