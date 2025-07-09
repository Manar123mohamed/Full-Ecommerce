import React, { useEffect,useState,useContext } from 'react'
import style from './Home.module.css'
import { UserContext } from '../Context/UserContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';


export default function Home() {
 
    const [counter,setCounter]=useState(0);
    useEffect(()=>{},[])
  return (
    <>
    <MainSlider />
    
     <CategoriesSlider />
    <RecentProducts />
    
    {/* <h1>Home</h1> */}
   
    </>
  )
}
