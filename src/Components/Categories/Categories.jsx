

import React from 'react';
import { Link } from 'react-router-dom';
import useProductCategory from '../Hooks/useProductCategory';
import { PacmanLoader } from 'react-spinners';

export default function Categories() {
  const { data, isLoading } = useProductCategory();

  return (
    <>
      {isLoading ? ( <div className="flex justify-center items-center h-screen"><PacmanLoader color="#689d5d" /> </div> ) : (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">All Categories</h2>
          <div className="flex flex-wrap   "> {data?.map((category) => (<div key={category._id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-7 " >
         <Link to={`/categoryProducts/${category._id}`} state={{ name: category.name }} className="block bg-white shadow-sm rounded-lg hover:shadow-green-700 transition cursor-pointer overflow-hidden">
            <img  src={category.image} alt={category.name}  className="w-full h-90 object-cover"/>
            <div className="p-4 pb-3 text-center">
            <h3 className="text-2xl p-4 font-bold text-green-700">{category.name}</h3>
            </div>
         </Link>
    </div>
  ))}
</div>

        </div>
      )}
    </>
  );
}
