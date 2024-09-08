import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext'; // Import CartContext

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false); // State to track if order is completed
  const { userToken } = useContext(UserContext);
  const { clearCart } = useContext(CartContext); // Destructure clearCart from CartContext

  const formik = useFormik({
    initialValues: {
      details: '',
      address: '',
      phone: '',
    },
    onSubmit: async (values) => {
        setOrderCompleted(true); // Set orderCompleted to true on successful submission
        clearCart(); // Clear the cart after successful order submission
      },
  });

  return (
    <div className="container mt-20 mb-4">
      {orderCompleted ? (
        <h2 className="text-center m-5 text-3xl font-bold text-green-700">
         Thank you! Your order is confirmed.
        </h2>
      ) : (
        <>
          <h2 className="text-center m-5 text-3xl font-bold text-green-700">
            Checkout
          </h2>
          <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="address"
                id="address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
                placeholder=" "
                value={formik.values.address}
                onChange={formik.handleChange}
                required
              />
              <label
                htmlFor="address"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="details"
                id="details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
                placeholder=" "
                value={formik.values.details}
                onChange={formik.handleChange}
                required
              />
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Details
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
                placeholder=" "
                value={formik.values.phone}
                onChange={formik.handleChange}
                required
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : 'Submit'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
