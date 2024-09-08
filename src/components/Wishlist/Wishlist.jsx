import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductWishlistContext } from './../Context/ProductWishlistContext';
import { ProductContext } from './../Context/ProductIDcontext';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(ProductWishlistContext);
  const { setSelectedProductId } = useContext(ProductContext);
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWishlistDetails() {
      setLoading(true); // Start loading
      const fetchedDetails = await Promise.all(
        wishlist.map(async (id) => {
          try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            return response.data.data;
          } catch (error) {
            console.error(`Error fetching details for product ID ${id}:`, error);
            return null;
          }
        })
      );
      setWishlistDetails(fetchedDetails.filter(item => item !== null));
      setLoading(false); // Stop loading
    }

    if (wishlist.length > 0) {
      fetchWishlistDetails();
    } else {
      setLoading(false); // Stop loading if wishlist is empty
    }
  }, [wishlist]);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    navigate('/productdetails');
  };

  const handleClearWishlist = () => {
    clearWishlist(); // Clear the wishlist context
    setWishlistDetails([]); // Clear the wishlist details state
  };

  return (
    <div className="bg-gray-50 p-10">
      <div className="titled flex flex-wrap justify-between">
        <div className="1">
          <span className="fa-solid fa-heart ml-6 text-5xl cursor-pointer text-red-500"></span>
          <span className="text-4xl font-bold mb-8 ml-2 text-gray-900">My WishList</span>
        </div>
        {wishlist.length > 0 && (
          <button
            onClick={handleClearWishlist} // Use the new clear wishlist handler
            className="bg-red-500 hover:bg-red-700 w-1/6 text-center ml-10 mb-4 py-2 text-white transition-colors duration-300 ease-in-out rounded"
          >
            Clear Wishlist
          </button>
        )}
      </div>
      {loading ? (
        <div className="spinner m-auto">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      ) : wishlistDetails.length > 0 ? (
        wishlistDetails.map((product) => (
          <div
            className="flex items-center mb-8 p-4 rounded-lg shadow-sm cursor-pointer"
            key={product.id}
            onClick={() => handleProductClick(product.id)} // Navigate to product details on click
          >
            <img src={product.imageCover} alt={product.title} className="w-36 h-36 object-cover rounded-lg mr-6" />
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
              <p className="text-green-500 font-medium text-lg">{product.price} EGP</p>
              <button
                className="text-red-500 mt-2 flex items-center"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the product click event
                  removeFromWishlist(product.id);
                }}
              >
                <i className="fa-solid fa-trash mr-2"></i> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-700">Your wishlist is empty.</p>
      )}
    </div>
  );
}
