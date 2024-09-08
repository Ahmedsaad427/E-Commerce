import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CategoryContext } from './../Context/CategoryContext';

export default function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const { selectedCategoryId } = useContext(CategoryContext);

  async function getSubCategories() {
    if (!selectedCategoryId) return;

    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${selectedCategoryId}/subcategories`);
      setSubCategories(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log("Error in fetching subcategories");
    }
  }

  useEffect(() => {
    getSubCategories();
  }, [selectedCategoryId]);

  return (
    <div className="flex flex-wrap flex-row justify-center items-center mt-20">
      {subCategories.length > 0 ? (
        subCategories.map((subCategory) => (
          <div key={subCategory.id} className="w-1/3 mb-12 item cursor-pointer">
            <h3 className="text-center mt-2 text-2xl font-bold text-gray-900 mb-7">{subCategory.name}</h3>
          </div>
        ))
      ) : (
        <div className="spinner m-auto">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
    </div>
  );
}
