import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const ProtectRoute = ({ children }) => {
  const { userToken } = useContext(UserContext);

  if (!userToken) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectRoute;
