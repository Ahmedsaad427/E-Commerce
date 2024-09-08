import './App.css';
import Layout from './components/Layout/Layout';
import Notfound from './components/Notfound/Notfound';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Wishlist from './components/Wishlist/Wishlist';
import Brands from './components/Brands/Brands';
import Category from './components/Category/Category';
import SubCategory from './components/SubCategory/SubCategory';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Product from './components/Product/Product';
import ProtectRoute from './components/ProtectedRoute/ProtectRoute';
import CategoryContextProvider from './components/Context/CategoryContext';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductContextProvider from './components/Context/ProductIDcontext';
import { UserContextProvider } from './components/Context/UserContext';
import { ProductWishlistProvider } from './components/Context/ProductWishlistContext';
import Cart from './components/Cart/Cart';
import { CartContextProvider } from './components/Context/CartContext';
import Checkout from './components/Checkout/Checkout';
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Notfound />,
      children: [
        { path: "/", element: <ProtectRoute><Home/></ProtectRoute> },
        { path: "Register", element: <Register /> },
        { path: "Login", element: <Login /> },
        { path: "Cart", element: <ProtectRoute><Cart/></ProtectRoute> },
        { path: "Wishlist", element: <ProtectRoute><Wishlist/></ProtectRoute> },
        { path: "Brands", element: <ProtectRoute><Brands/></ProtectRoute> },
        { path: "Category", element: <ProtectRoute><Category/></ProtectRoute> },
        { path: "Product", element: <ProtectRoute><Product/></ProtectRoute> },
        { path: "subcategories", element: <ProtectRoute><SubCategory/></ProtectRoute> },
        { path: "productdetails", element: <ProtectRoute><ProductDetails/></ProtectRoute> },
        { path: "Checkout", element: <ProtectRoute><Checkout/></ProtectRoute> }
      ],
    },
  ]);

  return (

    <UserContextProvider>
      <CartContextProvider>
      <ProductWishlistProvider>
      <ProductContextProvider>
        <CategoryContextProvider>
          <RouterProvider router={router} />
        </CategoryContextProvider>
      </ProductContextProvider>
      </ProductWishlistProvider>
      </CartContextProvider>
    </UserContextProvider>

  );
}

export default App;
