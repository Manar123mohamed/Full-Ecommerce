import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 8,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  function getAllCategories() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 overflow-x-hidden mt-3 mb-3">
      <div className="py-4 my-5">
        <h1 className="font-bold text-lg mb-4">Shop Popular Categories</h1>
        <Slider {...settings}>
          {categories?.map((category) => (
            <div key={category._id}>
              <img src={category.image} alt={category.name} className="h-[180px] w-full object-cover rounded-md"/>
              <h1 className="text-sm font-light pt-2 text-center">{category.name}</h1>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}






