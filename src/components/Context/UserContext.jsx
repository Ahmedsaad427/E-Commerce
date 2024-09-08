import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const saveToken = (token) => {
    setUserToken(token);
  };

  const logout = () => {
    setUserToken(null);
  };

  return (
    <UserContext.Provider value={{ userToken, saveToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};
