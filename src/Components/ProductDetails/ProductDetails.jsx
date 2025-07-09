import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext';


export default function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  const { id, category } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedproduct, setRelatedproduct] = useState(null);
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

  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => setProductDetails(data.data));

    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        const allProducts = data.data;
        const related = allProducts.filter(p => p.category.name === category);
        setRelatedproduct(related);
      });
  }, [id, category]);

  return (<>
    <div className="container mx-auto px-4">

   
      <div className="row flex flex-wrap">
       <div className="w-full md:w-1/4 p-2">
          <Slider {...settings}>
            {productDetails?.images.map((src, idx) => (
              <img key={idx} src={src} alt="" className="w-full object-cover rounded" />
            ))}
          </Slider>
       </div>
  <div className="w-full md:w-3/4 p-5">
    <h1 className="text-3xl">{productDetails?.title.split(" ",6).join(" ")}</h1>
    <p className="text-gray-700 pt-2">{productDetails?.description.split(" ",15).join(" ")}</p>
    <div className="flex justify-between items-center pt-2 pb-2">
      {productDetails?.priceAfterDiscount ? (
        <>
          <span className="font-light line-through text-red-700">{productDetails?.price} ECP</span>
          <span className="font-light text-green-700">{productDetails?.priceAfterDiscount} ECP</span>
        </>
      ) : (
        <span className="font-light">{productDetails?.price} ECP</span>
      )}
      <span> {productDetails?.ratingsAverage}<i className="fas fa-star text-yellow-600 ml-1"></i></span>
    </div>
    <div className='flex'>
    <button onClick={() => addProductToCart(productDetails.id)} className="btn mt-3">Add To Cart</button>
   <button onClick={() => toggleWishlist(productDetails.id)} className="p-2">
  <i className={`fas fa-heart text-3xl cursor-pointer ${isInWishlist(productDetails?.id) ? "text-red-500" : "text-gray-400"}`}></i>
</button>

    </div>
    </div>

     </div>

      <div className="flex flex-wrap -mx-4 mt-12">
        {relatedproduct?.map(product => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6 relative" >
            <div className="product p-4 m-2 rounded shadow hover:shadow-lg transition relative">
              <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt={product.title} className="w-full rounded"/>
                <h3 className="text-green-500 text-xl mt-2">{product.category.name}</h3>
                <h2 className="text-xl">{product.title.split(' ', 2).join(' ')}</h2>
                <div className="flex justify-between items-center pt-2 pb-2">
                  {product.priceAfterDiscount ? (
                    <>
                      <span className="font-light line-through text-red-700">{product.price} ECP</span>
                      <span className="font-light text-green-700"> {product.priceAfterDiscount} ECP </span>
                    </>
                  ) : (
                    <span className="font-light">{product.price} ECP</span>
                  )}
                  <span className="flex items-center ">
                    <span>{product.ratingsAverage}</span>
                    <i className="fas fa-star text-yellow-600"></i>
                  </span>
                </div>
              </Link>
              <div className="flex">
                  <button onClick={() => addProductToCart(product.id)}className="btn mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add To Cart</button>
                  <button onClick={() => toggleWishlist(product.id)} className="p-2">
                        <i className={`fas fa-heart text-3xl cursor-pointer ${isInWishlist(product.id) ? "text-red-500" : "text-gray-400"}`}></i>
                      </button>

              </div>
             
              {product.priceAfterDiscount && (
                <span className="bg-red-100 text-red-800 text-xs font-medium absolute top-0 left-2 z-20 px-2 py-1 rounded-sm dark:bg-red-900 dark:text-red-300">
                  Sale
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
