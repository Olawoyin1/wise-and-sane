import React from 'react';
import Slider from 'react-slick';

const images = [
  '../../Images/slide.webp',
  '../../Images/sos.webp',
  '../../Images/sos1.jpg',
];

const ImageSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full relative  mx-auto mb-8">
        <div className='absolute w-full md:h-[400px] h-[300px] border border-gray-700 rounded-xl -left-1 top-1 md:-left-4 md:top-3'/>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full  h-[300px] md:h-[400px] object-cover overflow-hidden rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;



