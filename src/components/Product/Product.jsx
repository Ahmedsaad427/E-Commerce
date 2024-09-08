import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./../Context/ProductIDcontext";
import { ProductWishlistContext } from "./../Context/ProductWishlistContext";
import { CartContext } from "./../Context/CartContext";
export default function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { setSelectedProductId } = useContext(ProductContext);
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useContext(
    ProductWishlistContext
  );
  const { addToCart, removeFromCart, isProductInCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getProducts();
  }, []);

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    navigate("/productdetails");
  };

  const handleWishlistClick = (e, productId) => {
    e.stopPropagation();
    if (isProductInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    const { id, price, title, imageCover } = product;
    if (isProductInCart(id)) {
      removeFromCart(id);
    } else {
      addToCart(id, 1, price, title, imageCover);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="sbar mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar p-3 border border-gray-300 rounded w-full"
          style={{ fontSize: "1.2rem" }}
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button className="search-button ml-2">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out rounded-lg"
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="product bg-white border rounded-lg shadow-md p-4 flex flex-col h-full">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-100 object-cover mb-3 rounded-lg"
                />
                <div className="flex justify-between mt-3">
                  <h3 className="text-green-500 text-base mb-3 hover:text-green-800">
                    {product.category.name}
                  </h3>
                  <span
                    className={`fa-solid fa-heart text-2xl cursor-pointer ${
                      isProductInWishlist(product.id)
                        ? "text-red-500"
                        : "text-gray-800"
                    }`}
                    onClick={(e) => handleWishlistClick(e, product.id)}
                  ></span>
                </div>
                <h4 className="font-semibold text-gray-900 hover:text-gray-800 mb-1">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h4>
                <div className="flex justify-between mt-3">
                  <span className="hover:text-gray-800">
                    {product.price} EGP
                  </span>
                  <div className="flex items-center">
                    <span className="fa-solid fa-star text-yellow-400 ml-1 hover:text-yellow-500"></span>
                    {product.ratingsAverage}
                  </div>
                </div>
              </div>
              <button
                className="flex items-center justify-center w-full py-2 text-white transition-colors duration-300 ease-in-out rounded mt-2"
                onClick={(e) => handleCartClick(e, product)}
              >
                {isProductInCart(product.id) ? (
                  <span className="flex items-center">
                    <i className="fas fa-times mr-2"></i>
                    Remove from Cart
                  </span>
                ) : (
                  <span className="flex items-center">
                    <i className="fas fa-cart-plus mr-2"></i>
                    Add to Cart
                  </span>
                )}
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
