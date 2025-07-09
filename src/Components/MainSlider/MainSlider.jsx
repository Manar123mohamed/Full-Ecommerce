import React, { useEffect,useState } from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../assets/images/blog-img-1.jpeg'
import slide2 from '../../assets/images/blog-img-2.jpeg'
import mailSlider1 from'../../assets/images/slider-image-1.jpeg'
import mailSlider2 from'../../assets/images/slider-image-2.jpeg'
import mailSlider3 from'../../assets/images/slider-image-3.jpeg'
import Slider from "react-slick";


export default function MainSlider() {
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    const [counter,setCounter]=useState(0);
    useEffect(()=>{},[])
  return (
    <>
   <div className="row">
    <div className="w-3/4">
    <Slider {...settings}>
   <img src={mailSlider1} alt=""  className='w-full h-[400px]'/>
   <img src={mailSlider2} alt=""  className='w-full  h-[400px]'/>
   <img src={mailSlider3} alt=""  className='w-full  h-[400px]'/>

  
   </Slider>
    </div>
    <div className="w-1/4">
    <img src={slide1} alt=""  className='w-full  h-[200px]'/>
    <img src={slide2} alt=""  className='w-full  h-[200px]'/>

    </div>
   </div>
    </>
  )
}
