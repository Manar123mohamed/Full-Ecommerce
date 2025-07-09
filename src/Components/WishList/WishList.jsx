

import React, { useContext } from 'react';
import { WishListContext } from '../Context/WishListContext';
import { CartContext } from '../Context/CartContext';
import { PacmanLoader } from 'react-spinners';

export default function WishList() {
  const { cartDetails, removeItem} = useContext(WishListContext);
  const { addProductToCart, loding  } = useContext(CartContext);

 
  if (loding) {
    return (
      <div className="flex justify-center items-center h-screen"> <PacmanLoader color="#689d5d" /></div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex py-7 justify-center">
        <h1 className="text-2xl text-green-700 uppercase border-b-4 border-green-700 inline-block"> My Wish List</h1>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <tbody>
          {cartDetails?.data?.map((product) => (
            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
              <td className="p-4"><img src={product.imageCover} className="w-16 md:w-32 object-contain" alt={product.title} /></td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {product.title}
                <p className="py-2 text-sm font-semibold text-green-700">{product.price} EGP</p>
                <button onClick={() => removeItem(product.id)} className="flex items-center gap-1 font-medium text-red-600 hover:underline" >
                  <i className="fas fa-trash"></i> Remove
                </button>
              </td>
              <td className="px-6 py-4">
                <button onClick={() => addProductToCart(product.id)} className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-md" >
                  Add to Cart <i className="fas fa-shopping-cart"></i>
                </button>
              </td>
            </tr>
          ))}

          {cartDetails?.data?.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-8 text-2xl text-red-600 uppercase">
                <p>Wishlist is empty</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

