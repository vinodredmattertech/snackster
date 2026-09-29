import React from 'react';
import Slider from 'react-slick';
import OptimizedImage from './OptimizedImage';

const ChickenNuggetsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      imgSrc: '../images/issa-vibe.png',
    },
    {
      imgSrc: '../images/ke-sath-no-stopping.png',
    },
    {
      imgSrc: '../images/aur-local-mimosa.png',
    },
    // Add more slides as needed
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className={`slide`}>
            <OptimizedImage src={slide.imgSrc} alt={`Slide ${index}`} className="slide-image" loading="lazy" responsive={true} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ChickenNuggetsSlider;
