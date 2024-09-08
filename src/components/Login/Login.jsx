import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { UserContext } from '../Context/UserContext';

export default function Login() {
  const { saveToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [API, setAPI] = useState("");
  const [Loading, setLoading] = useState(false);

  async function handleLogin(values) {
    setLoading(true);
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      saveToken(data.token); // Save the token using the context function
      navigate("/"); // Redirect to home or any protected route
    } catch (error) {
      console.log(error.response.data.message); // Display error message
      setAPI(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/,
        "Password must be 6-10 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleLogin,
  });

  return (
    <div className="container mt-20 mb-4">
      {API && <div className="w-1/4 bg-red-200 text-red-600 text-xl text-center rounded p-3 m-auto font-bold">{API}</div>}
      <h2 className="text-center m-5 text-3xl font-bold text-green-700">Login Now</h2>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
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
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-700 text-sm bg-red-200 rounded m-3 p-4">{formik.errors.email}</div>
          )}
        </div>
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
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-700 text-sm bg-red-200 rounded m-3 p-4">{formik.errors.password}</div>
          )}
        </div>
        <h4 className="font-semibold text-black text-base text-right">
          Do not have an account ?
          <NavLink to={"/register"} className="font-bold text-green-600 text-base ml-3">
            Register Now
          </NavLink>
        </h4>
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {Loading ? <span className="loader"></span> : "Login"}
        </button>
      </form>
    </div>
  );
}
