import React, { useEffect,useState } from 'react'
import style from './Footer.module.css'
import logo from '../../assets/images/freshcart-logo.svg';
import { Link } from 'react-router-dom';

export default function Footer() {
    const [counter,setCounter]=useState(0);
    useEffect(()=>{},[])
  return (
    <>
   <footer className="bg-green-800 text-white py-8 mt-10 ">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
    <div className="mb-4 md:mb-0 text-center md:text-left">
      <Link  className="flex items-center gap-2"><img src={logo} width={110} alt="freshcart-logo" /> </Link>
      <p className="text-gray-400 text-sm">© {new Date().getFullYear()} freshcart. All rights reserved.</p>
    </div>

    <div className="flex space-x-6 mb-4 md:mb-0">
      <a href="#" className=" !text-white transition">Home</a>
      <a href="#" className=" !text-white transition">Products</a>
      <a href="#" className=" !text-white transition">Contact</a>
      <a href="#" className=" !text-white transition">About</a>
    </div>

    <div className="flex space-x-4">
      <a href="#" className=" text-xl !text-white transition">
        <i className="fab fa-facebook"></i>
      </a>
      <a href="#" className="text-xl !text-white transition">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" className=" text-xl !text-white transition">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" className=" text-xl !text-white transition">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  </div>
</footer>

    </>
  )
}
