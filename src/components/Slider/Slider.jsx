import React, { useState } from 'react';
import s1 from '../../assets/s1.jpeg';
import s2 from '../../assets/s2.jpeg';
import s3 from '../../assets/s3.jpeg';
import s4 from '../../assets/s4.jpg'; // Add the new images
import s5 from '../../assets/s5.jpg'; // Add the new images

const Slider = () => {
  const images = [
    {
      left: s3, // Image on the left column
      rightTop: s4, // Top image in the right column
      rightBottom: s5, // Bottom image in the right column
    },
    {
      left: s1, // New set of images
      rightTop: s4, // New set of images
      rightBottom: s5, // Reuse or replace with another image
    },
    {
      left: s2, // New set of images
      rightTop: s4, // New set of images
      rightBottom: s5, // Reuse or replace with another image
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="slider">
      <div className="image-grid">
        <div className="left-column">
          <img src={images[currentIndex].left} alt="Left" className="grid-image" />
        </div>
        <div className="right-column">
          <img src={images[currentIndex].rightTop} alt="Top Right" className="grid-image right-top" />
          <img src={images[currentIndex].rightBottom} alt="Bottom Right" className="grid-image right-bottom" />
        </div>
      </div>

      <div className="dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
