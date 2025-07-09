
import React, { useState } from 'react';
import useProductsBrand from '../Hooks/useProductsBrand';
import { PacmanLoader } from 'react-spinners';

export default function Brands() {
  const { data, isLoading } = useProductsBrand();
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PacmanLoader color="#689d5d" />
        </div>
      ) : (
        <div className="container mx-auto px-4 overflow-x-hidden py-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">All Brands</h2>
          <div className="flex flex-wrap -mx-2">
            {data?.map((brand) => (<div key={brand._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                <div onClick={() => setSelectedBrand(brand)}className="bg-white p-4 shadow-sm rounded-lg text-center hover:shadow-green-700 transition cursor-pointer">
                  <img src={brand.image} alt={brand.name} className="w-full h-40 object-contain mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">{brand.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedBrand && !isLoading && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-start pt-24 z-50">
          <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setSelectedBrand(null)} className="absolute top-2 right-2 text-green-700 hover:text-green-500 text-2xl font-bold" >
              <span><i className="fas fa-times"></i></span>
            </button>

            <div className="flex items-center justify-between border-b border-gray-300 py-4 px-4 gap-6">
              <div className="flex flex-col px-4 items-start">
                <h2 className="text-5xl font-bold text-green-700 mb-2">{selectedBrand.name}</h2>
                <h2 className="text-xl font-bold text-gray-700 mb-2">{selectedBrand.name}</h2>
              </div>
              <img src={selectedBrand.image} alt={selectedBrand.name} className="w-40 h-40 object-contain"/>
            </div>

            <div className="flex mt-6">
              <button onClick={() => setSelectedBrand(null)} className="ml-auto px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}




