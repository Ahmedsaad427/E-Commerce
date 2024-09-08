import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { UserContext } from '../Context/UserContext';

export default function Register() {
  const { saveToken } = useContext(UserContext); // Destructure saveToken from context
  const navigate = useNavigate();
  const [API, setAPI] = useState("");
  const [Loading, setLoading] = useState(false);

  async function handleRegister(values) {
    setLoading(true);
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      saveToken(data.token); // Save the token using the context function
      console.log(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message); // Display error message
      setAPI(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // Validation schema
  let schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 10 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/,
        "Password must be 6-10 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Formik setup
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: schema,
    onSubmit: handleRegister,
  });

  return (
    <> 
      <div className="container mt-20 mb-4">
        {API ? <div className="w-1/4 bg-red-200 text-red-600 text-xl text-center rounded p-3 m-auto font-bold">
          {API}
        </div> : null}

        <h2 className="text-center m-5 text-3xl font-bold text-green-700">Register Now</h2>

        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First name
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div className="text-red-700 text-sm bg-red-200 rounded m-3 p-4">{formik.errors.name}</div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              required
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-700 text-sm bg-red-200 rounded m-3 p-4">{formik.errors.email}</div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              required
            />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-700 text-sm bg-red-200 rounded m-3 p-4">{formik.errors.password}</div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              required
            />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm password
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="text-red-700 text-sm bg-red-200 rounded m-3 p-4">{formik.errors.rePassword}</div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              required
            />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone number
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-red-700 text-sm bg-red-200 rounded m-3 p-4">{formik.errors.phone}</div>
          ) : null}
          <h4 className="font-semibold text-black text-base text-right">Have an account ?
            <NavLink to={"/login"} className="font-bold text-green-600 text-base ml-3">Login Now</NavLink>
          </h4>
          <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {Loading ? <span className="loader"></span> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
