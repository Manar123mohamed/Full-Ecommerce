import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartDetails } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  function Logout() {
    localStorage.clear();
    setToken(null);
    navigate('/login');
  }

  return (
    <nav className="bg-gray-100 fixed top-0 left-0 right-0 py-2 z-50 shadow">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2"><img src={logo} width={110} alt="freshcart-logo" /> </Link>

        <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>

       
        <div className={`flex-col lg:flex-row lg:flex  items-center gap-4 absolute lg:static top-full left-0 w-full lg:w-auto bg-gray-100 lg:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? 'flex' : 'hidden'}`}>
          {token && (
            <ul className="flex flex-col lg:flex-row mx-3 items-center gap-2 lg:gap-4 w-full lg:w-auto text-center lg:text-left">
              <li><NavLink className="text-sm text-slate-900 font-light" to="">Home</NavLink></li>
              <li><NavLink className="text-sm text-slate-900 font-light" to="cart">Cart</NavLink></li>
              <li><NavLink className="text-sm text-slate-900 font-light" to="wishlist">WishList</NavLink></li>
              <li><NavLink className="text-sm text-slate-900 font-light" to="products">Products</NavLink></li>
              <li><NavLink className="text-sm text-slate-900 font-light" to="categories">Categories</NavLink></li>
              <li><NavLink className="text-sm text-slate-900 font-light" to="brands">Brands</NavLink></li>
            </ul>
          )}
          <ul className="flex flex-col lg:flex-row items-center lg:justify-between gap-2 lg:gap-4 w-full lg:w-auto text-center lg:text-left">
            {token ? (
              <>
                <li className="relative">
                  <Link to="/cart" className="flex items-center">
                    <i className="text-2xl fas fa-cart-shopping"></i>
                    {cartDetails?.numOfCartItems && (
                      <span className="text-xs rounded-full text-center w-5 h-5 absolute -top-2 -left-2 text-white bg-green-700 flex items-center justify-center">
                        {cartDetails.numOfCartItems}
                      </span>
                    )}
                  </Link>
                </li>
                <li><span className="text-sm text-slate-900 font-light cursor-pointer" onClick={Logout}>Logout</span></li>
              </>
            ) : (
              <>
                <li><NavLink className="text-sm text-slate-900 font-light" to="login">Login</NavLink></li>
                <li><NavLink className="text-sm text-slate-900 font-light" to="register">Register</NavLink></li>
              </>
            )}
            <li className="flex items-center gap-2 justify-center">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-tiktok"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}














// import React, { useContext, useEffect,useState } from 'react'
// import style from './Navbar.module.css'
// import logo from '../../assets/images/freshcart-logo.svg'
// import { NavLink, useNavigate,Link } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';
// import {CartContext}from '../Context/CartContext';

// export default function Navbar() {
  
//   let navigate=useNavigate()
//     let{cartDetails}=useContext(CartContext)

//     const [counter,setCounter]=useState(0);
    
//     let {token,setToken}=useContext(AuthContext)
//      function Logout(){
//       localStorage.clear();
//       setToken(null);
//       navigate('/login')
//      }
//     useEffect(()=>{},[])
//   return (
//     <>
//     <nav className='bg-gray-100 fixed top-0 left-0 right-0 py-2 z-50 '>
//        <div className='flex container flex-col lg:flex-row items-center justify-between mx-auto py-2'>
//     <div  className='flex flex-col lg:flex-row items-center '>
//       <img src={logo} width={110}  alt="freshcart-logo" />
//       {token?<ul  className='flex flex-col lg:flex-row items-center '>
//         <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={''}>Home</NavLink></li>
//         <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={'cart'}>Cart</NavLink></li>
//         <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={'wishlist'}>WishList</NavLink></li>
//         <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={'products'}>Products</NavLink></li>
//         <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={'categories'}>Categories</NavLink></li>
//         <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={'brands'}>Brands</NavLink></li>

//       </ul>:null}
//     </div>

//     <div>
//       <ul  className='flex flex-col lg:flex-row items-center '>
//         {token? <>
//         <Link to={'/cart'}> <li className='relative'>
//           <i className='text-2xl fas fa-cart-shopping'></i>
//           {cartDetails?.numOfCartItems?<div className='text-sm rounded-full text-center size-5 absolute -top-3 -left-3 text-white bg-green-700'>{cartDetails?.numOfCartItems}</div>:null}
//           </li></Link>
       
//         <li> <span className='mx-2 text-sm text-slate-900 font-light cursor-pointer' onClick={Logout}>logout</span></li>
//         </>:<>
//          <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={'login'}>Login</NavLink></li>
//         <li> <NavLink className='mx-2 text-sm text-slate-900 font-light' to={'register'}>register</NavLink></li>
//         </>
//         }
       
       
//        <li className='flex items-center'>
//         <i className='fab fa-facebook mx-1'></i>
//         <i className='fab fa-tiktok mx-1'></i>
//         <i className='fab fa-instagram mx-1'></i>
//         <i className='fab fa-twitter mx-1'></i>

//        </li>

//       </ul>
//     </div>

//    </div>
//     </nav>
  
//     </>
//   )
// }
