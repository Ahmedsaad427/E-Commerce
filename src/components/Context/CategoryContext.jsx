import React, { createContext, useState } from 'react';

// Create a Context for the selected category
export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <CategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      {props.children}
    </CategoryContext.Provider>
  );
}
