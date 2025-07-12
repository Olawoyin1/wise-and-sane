import React from 'react';


const ImageSlider: React.FC = () => {
 
  return (
    <div className="w-full relative  mx-auto mb-8">
        <div className='absolute w-full md:h-[500px] h-[350px] border border-gray-700 rounded-xl -left-1 top-1 md:-left-4 md:top-3 z-20'/>
      
      <div className="w-full  h-[350px] md:h-[500px] object-cover flex items-center justify-center overflow-hidden rounded-lg z-50" >
        <img src="../../Images/hero3.webp" alt="" className='object-cover h-full' />
      </div>
    </div>
  );
};


export default ImageSlider;



