import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [popupImage, setPopupImage] = useState(null); // State for the popup image
  const [showPopup, setShowPopup] = useState(false); // State for showing/hiding the popup

  async function getBrands() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(res.data.data);
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.log("Error in fetching data");
      setLoading(false); // Stop loading even if there's an error
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleImageClick = (imageUrl) => {
    setPopupImage(imageUrl);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupImage(null);
  };

  // Close popup when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="w-[85%] m-auto mt-10 sm:mt-20 md:mt-0"> 
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="spinner m-auto">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
          {brands.map((brand) => (
            <div key={brand._id} className="text-center item">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-auto cursor-pointer"
                onClick={() => handleImageClick(brand.image)}
              />
              <h3 className="mt-2 text-xl font-bold text-green-800 mb-3">{brand.name}</h3>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded shadow-lg">
            <button
              className="absolute top-2 right-2 text-black text-xl"
              onClick={closePopup}
            >
              <i className="fa fa-times"></i>
            </button>
            <img src={popupImage} alt="Popup" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
