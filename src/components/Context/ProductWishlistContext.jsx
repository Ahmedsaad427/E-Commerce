import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const ProductWishlistContext = createContext();

export function ProductWishlistProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from API when token is available
  useEffect(() => {
    const fetchWishlist = async () => {
      if (token) {
        try {
          const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
              token: token,
            },
          });
          const wishlistData = response.data.data.map(item => item.productId);
          setWishlist(wishlistData);
          localStorage.setItem('wishlist', JSON.stringify(wishlistData));
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      } else {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(localWishlist);
      }
    };

    fetchWishlist();
  }, [token]);

  // Function to add a product to the wishlist
  const addToWishlist = async (productId) => {
    if (token) {
      try {
        await axios.post(
          'https://ecommerce.routemisr.com/api/v1/wishlist',
          { productId },
          {
            headers: {
              token: token,
            },
          }
        );
        setWishlist((prevWishlist) => {
          const updatedWishlist = [...prevWishlist, productId];
          localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
          return updatedWishlist;
        });
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
      }
    } else {
      // Handle case where no token is present (e.g., local development or guest mode)
      setWishlist((prevWishlist) => {
        const updatedWishlist = [...prevWishlist, productId];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return updatedWishlist;
      });
    }
  };

  // Function to remove a product from the wishlist
  const removeFromWishlist = async (productId) => {
    if (token) {
      try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers: {
            token: token,
          },
        });
        setWishlist((prevWishlist) => {
          const updatedWishlist = prevWishlist.filter((id) => id !== productId);
          localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
          return updatedWishlist;
        });
      } catch (error) {
        console.error('Error removing product from wishlist:', error);
      }
    } else {
      // Handle case where no token is present (e.g., local development or guest mode)
      setWishlist((prevWishlist) => {
        const updatedWishlist = prevWishlist.filter((id) => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return updatedWishlist;
      });
    }
  };

  // Function to clear the entire wishlist
  const clearWishlist = async () => {
    if (token) {
      try {
        await Promise.all(
          wishlist.map(async (productId) => {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
              headers: {
                token: token,
              },
            });
          })
        );
        setWishlist([]);
        localStorage.removeItem('wishlist');
      } catch (error) {
        console.error('Error clearing wishlist:', error);
      }
    } else {
      // Clear wishlist locally
      setWishlist([]);
      localStorage.removeItem('wishlist');
    }
  };

  // Function to check if a product is in the wishlist
  const isProductInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  return (
    <ProductWishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isProductInWishlist,
      }}
    >
      {children}
    </ProductWishlistContext.Provider>
  );
}
