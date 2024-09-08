import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from './../Context/CategoryContext';
import Slider from 'react-slick'; // Import Slick Slider
import 'slick-carousel/slick/slick.css'; // Import Slick Slider CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slick Slider Theme CSS
export default function CategorySlider() {
    const [categories, setCategories] = useState([]);
    const { setSelectedCategoryId } = useContext(CategoryContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function getCategories() {
        try {
          const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
          setCategories(res.data.data);
        } catch (error) {
          console.log("Error in fetching data");
        }
      }
      getCategories();
    }, []);
  
    const handleCategoryClick = (categoryId) => {
      setSelectedCategoryId(categoryId);
      navigate(`/subcategories`);
    };
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {categories.map((category) => (
            <div className="slider-item" key={category.id} onClick={() => handleCategoryClick(category._id)}>
              <img src={category.image} alt={category.name} className="slider-image" />
              <h3 className="slider-title">{category.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  