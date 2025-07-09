import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import useCategoryProducts from '../Hooks/useCategoryProducts';
import { PacmanLoader } from 'react-spinners';
import { WishListContext } from '../Context/WishListContext';
import { useContext } from 'react';
import {CartContext}from '../Context/CartContext';

export default function CategoryProducts() {
  const { id } = useParams();
  const { state } = useLocation(); 
  const { data, isLoading } = useCategoryProducts(id);
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
      {isLoading ? (<div className="flex justify-center items-center h-screen"><PacmanLoader color="#689d5d" /></div> ) : (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Products for: {state?.name}</h2>
          <div className="flex flex-wrap -mx-2">
                {data?.map((product) => (
              <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
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
  );
}

