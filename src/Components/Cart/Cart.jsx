
import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import { PacmanLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartDetails, loding, getCart, removeItem, clearCart, updateCartItem } = useContext(CartContext);
  const { token } = useContext(AuthContext); 

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]); 

  if (loding) {
    return (
      <div className='flex justify-center items-center h-screen'><PacmanLoader color="#689d5d" /> </div>
    );
  }

  if (cartDetails?.numOfCartItems === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='font-extrabold text-green-700 text-4xl'>Cart Is Empty</h1>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-16 py-3"><span className="sr-only">Image</span></th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.data?.products.map((product) => (
              <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 object-contain" alt={product.product.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{product.product.title}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateCartItem(product.product._id, product.count - 1)} className="h-6 w-6 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">−</button><span className="mx-3">{product.count}</span>
                    <button onClick={() => updateCartItem(product.product._id, product.count + 1)} className="h-6 w-6 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">＋</button>
                  </div>
                </td>
                 <td className="px-6 py-4 font-semibold text-gray-900">{product.price} EGP</td>
                <td className="px-6 py-4">
                  <button onClick={() => removeItem(product.product._id)} className="text-red-600 hover:underline flex items-center gap-1"><i className="fas fa-trash"></i> Remove </button>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex justify-around items-center py-20'>
          <button onClick={clearCart} className='btn !w-1/4'>Clear All Cart</button>
          <Link to='/checkout' className='w-1/4'><button className='btn'>Check Out</button></Link>
        </div>
      </div>
    </>
  );
}
