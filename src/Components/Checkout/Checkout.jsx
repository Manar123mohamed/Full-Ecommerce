import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { AuthContext } from '../Context/AuthContext';
import {CartContext} from '../Context/CartContext';

export default function Checkout() {
  const[erroreMessage,setErroreMessage]=useState(null);
  let {cartDetails,checkOut}=useContext(CartContext)
  const[isloding,setIsLoding]=useState(null)
  let {setToken}=useContext(AuthContext)

  async function handleCheckOut(cartId,url) {
  //  console.log(values);
 let {data}=  await checkOut(cartId,url,formik.values)
   console.log(data.session.url);
   if(data.status=='success'){
    window.location.href=data.session.url
   }
   
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city:'',
    },
    onSubmit:()=>handleCheckOut(cartDetails.cartId,'http://localhost:5173')
  });

  return (
    <>
      <form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
        <h1 className="text-green-700 text-2xl my-5 font-bold">Pay now</h1>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="details" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" " />
          <label htmlFor='floating-email' className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">details</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" " />
          <label htmlFor='floating-email' className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">phone</label>
        </div>

         <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" " />
          <label htmlFor='floating-email' className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">city</label>
        </div>

       

  

        <button disabled={isloding?true:false} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
         {isloding?<i className='fas fa-spin fa-spinner'></i>:"Pay Now"}
        </button>
      </form>
    </>
  );
}

