import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from './../Context/CategoryContext';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { setSelectedCategoryId } = useContext(CategoryContext);
  const navigate = useNavigate(); // Use the navigate hook

  async function getCategories() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(res.data.data);
      setLoading(false); // Stop loading once data is fetched
      console.log(res.data.data); // Log the fetched data to check for the Music category
    } catch (error) {
      console.log("Error in fetching data");
      setLoading(false); // Stop loading even if there's an error
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    console.log("Selected Category ID:", categoryId);
    setSelectedCategoryId(categoryId); // Set the category ID in context
    navigate(`/subcategories`); // Navigate to the subcategory page
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="spinner m-auto">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center mt-4">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 mt-4" 
              onClick={() => handleCategoryClick(category._id)} 
            >
              <div className="h-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-100 object-cover" // Set a fixed height for the image
                />
                <h3 className="text-center text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
