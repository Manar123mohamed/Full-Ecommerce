import React, { useEffect,useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout() {
    const [counter,setCounter]=useState(0);
    useEffect(()=>{},[])
  return (
    <>
    <Navbar/>
    <div className='container mx-auto my-9 py-9'>
      <Outlet></Outlet>
    </div>
    <Footer />
    </>
  )
}
