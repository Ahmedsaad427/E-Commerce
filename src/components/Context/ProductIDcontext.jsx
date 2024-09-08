import React, { createContext, useState } from 'react';

// Create a Context for the selected product
export const ProductContext = createContext();

export default function ProductContextProvider(props) {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <ProductContext.Provider value={{ selectedProductId, setSelectedProductId }}>
      {props.children}
    </ProductContext.Provider>
  );
}
