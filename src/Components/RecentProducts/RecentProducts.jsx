
import React, { createContext, useEffect,useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios';
import { data, Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { useContext } from 'react';
import {CartContext}from '../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../Hooks/useProducts';
import { WishListContext } from '../Context/WishListContext';


export default function RecentProducts() {
let {data,isError,isFetching,isLoading,error}=useProducts()
  let {addProductToCart}=useContext(CartContext)
  let{addProductToWish,cartDetails, removeItem}=useContext(WishListContext)

  const isInWishlist = (productId) => {
    return cartDetails?.data?.some((item) => item.id === productId)
  }

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeItem(productId)
    } else {
      addProductToWish(productId)
    }
  }


  return (
 <>
      {isLoading ? (<div className="flex justify-center items-center h-screen"><PacmanLoader color="#689d5d" /></div>) :
       (
        <div className="container mx-auto px-4 overflow-x-hidden">
          <div className="flex flex-wrap -mx-2">
            {data?.map((product) => (<div key={product.id}className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 relative">
                <div className="product p-4 m-2  rounded-lg shadow-sm relative h-full flex flex-col">
                  <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                    <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover rounded-md"/>
                    <h3 className="text-green-500 text-xl mt-2">{product.category.name}</h3>
                    <h2 className="text-xl font-semibold truncate">{product.title.split(" ", 2).join(" ")}</h2>
                    <div className="flex justify-between items-center pt-2 pb-2">
                     {product.priceAfterDiscount ? (
                      <>
                        <span className="font-light line-through text-red-700">{product.price} ECP</span>
                        <span className="font-light text-green-700"> {product.priceAfterDiscount} ECP </span>
                      </>) : (
                        <span className="font-light">{product.price} ECP</span>
                      )}
                      <span className="flex items-center gap-1">{product.ratingsAverage}<i className="fas fa-star text-yellow-600"></i></span>
                    </div>
                  </Link>
                  <div className='d-flex'>
                   <button onClick={() => addProductToCart(product.id)} className="btn cursor-pointer !w-3/4 mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Add To Cart</button>
                   <button onClick={() => toggleWishlist(product.id)} className="p-2">
                      <i className={`fas fa-heart text-3xl cursor-pointer ${isInWishlist(product.id) ? "text-red-500" : "text-gray-400" }`} ></i>
                    </button>
                  </div>
                 
                  {product.priceAfterDiscount && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium absolute top-2 left-2 z-20 px-2 py-1 rounded-sm dark:bg-red-900 dark:text-red-300">
                      Sale
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

