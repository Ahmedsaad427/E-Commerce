import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Importing Slider from react-slick
import { ProductContext } from './../Context/ProductIDcontext';
import { ProductWishlistContext } from './../Context/ProductWishlistContext';
import { CartContext } from './../Context/CartContext';
import "slick-carousel/slick/slick.css"; // Slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Slick theme CSS

export default function ProductDetails() {
  const { selectedProductId } = useContext(ProductContext);
  const { wishlist, addToWishlist, removeFromWishlist, isProductInWishlist } = useContext(ProductWishlistContext);
  const { addToCart, removeFromCart, isProductInCart } = useContext(CartContext);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (selectedProductId) {
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/products/${selectedProductId}`)
        .then((res) => {
          setProductDetails(res.data.data);
        })
        .catch((error) => {
          console.log("Error in fetching product details");
        });
    }
  }, [selectedProductId]);

  const handleWishlistClick = () => {
    if (isProductInWishlist(selectedProductId)) {
      removeFromWishlist(selectedProductId);
    } else {
      addToWishlist(selectedProductId);
    }
  };

  const handleCartClick = () => {
    if (productDetails) {
      const { id, price, title, imageCover } = productDetails;
      if (isProductInCart(id)) {
        removeFromCart(id);
      } else {
        addToCart(id, 1, price, title, imageCover);
      }
    }
  };

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 mt-24 md:mt-0"> {/* Margin-top only for small screens */}
      {productDetails ? (
        <div className="flex flex-col lg:flex-row lg:space-x-10 lg:items-center">
          <div className="relative w-full lg:w-1/2">
            <Slider {...sliderSettings}>
              {productDetails.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-25 h-auto object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="details mt-10 lg:mt-0 lg:w-1/2 lg:text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {productDetails.title.split(' ').slice(0, 4).join(' ')}
            </h1>
            <p className="font-base text-gray-700 mt-4 text-base md:text-lg">
              {productDetails.description.split(' ').slice(0, 8).join(' ')}
            </p>
            <div className="flex flex-row justify-between items-center mt-3">
              <span className="text-lg md:text-xl">{productDetails.price} EGP</span>
              <div className="flex items-center space-x-2">
                <span className="fa-solid fa-star text-yellow-400 mr-2"></span>
                <span className="text-lg md:text-xl">{productDetails.ratingsAverage}</span>
                <span
                  className={`fa-solid fa-heart text-2xl cursor-pointer md:hidden ${
                    isProductInWishlist(selectedProductId) ? 'text-red-500' : 'text-gray-900'
                  }`}
                  onClick={handleWishlistClick}
                ></span>
              </div>
            </div>
            <div className="flex flex-col space-y-4 mt-6 md:flex-row md:justify-between">
              <button
                className={`w-full md:w-4/5 text-center py-2 text-white transition-colors duration-300 ease-in-out rounded ${
                  isProductInCart(productDetails.id) ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                }`}
                onClick={handleCartClick}
              >
                {isProductInCart(productDetails.id) ? 'Remove from Cart' : 'Add to Cart'}
              </button>
              {/* Heart icon for larger screens */}
              <span
                className={`fa-solid fa-heart text-2xl cursor-pointer hidden md:block ${
                  isProductInWishlist(selectedProductId) ? 'text-red-500' : 'text-gray-900'
                }`}
                onClick={handleWishlistClick}
              ></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner m-auto">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
    </div>
  );
}
