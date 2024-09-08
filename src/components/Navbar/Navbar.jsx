import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserContext } from './../Context/UserContext';
import { ProductWishlistContext } from './../Context/ProductWishlistContext';
import { CartContext } from './../Context/CartContext';

export default function Navbar() {
  const { userToken, saveToken } = useContext(UserContext);
  const { wishlist } = useContext(ProductWishlistContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function signout() {
    saveToken(null);
    navigate("/Login");
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-slate-50 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center">
          <span className="fa-solid fa-cart-shopping text-green-600 text-4xl"></span>
          <span className="text-2xl font-semibold whitespace-nowrap text-black ml-2">Fresh Cart</span>
        </NavLink>

        <div className="flex items-center space-x-4">
          {/* Toggle button for hamburger menu and X */}
          <button
            className="md:hidden text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <span className={`fa-solid fa-${isMenuOpen ? 'times' : 'bars'} text-2xl`}></span>
          </button>

          {/* Navigation links */}
          <div
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } flex-col md:flex md:flex-row md:space-x-8 items-center space-y-4 md:space-y-0 w-full md:w-auto`}
          >
            {userToken ? (
              <ul className="flex  sm:flex-row items-center font-semibold sm:space-y-4  md:space-y-0 md:space-x-8">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-600 md:p-0"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-600 md:p-0"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                    }
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-600 md:p-0"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                    }
                  >
                    Wishlist
                    {wishlist.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {wishlist.length}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/product"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-600 md:p-0"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                    }
                  >
                    Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/category"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-600 md:p-0"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                    }
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-600 md:p-0"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                    }
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>

          <div className={`md:flex hidden items-center`} id="navbar-sticky">
            {userToken ? (
              <>
               
                <NavLink to="/cart" className="relative mr-7">
                  <span className="fa-solid fa-cart-shopping text-3xl text-gray-900 hover:text-green-700"></span>
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
                <button onClick={signout} className="text-black p-1 rounded hover:bg-green-700 hover:text-white text-l mr-3">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/Register" className="text-black p-1 rounded hover:bg-green-800 hover:text-white text-l mr-3">
                  Register
                </NavLink>
                <NavLink to="/Login" className="text-black p-1 rounded hover:bg-green-700 hover:text-white text-l">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
