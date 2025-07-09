import React, { useContext, useEffect, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../Context/AuthContext';

export default function Register() {
  let {setToken}=useContext(AuthContext)

  const[erroreMessage,setErroreMessage]=useState(null);
  const[isloding,setIsLoding]=useState(null)
  const navigate = useNavigate();

  async function handleRegister(values) {
    setIsLoding(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .then((res)=>{
      setToken(res.data.token)
      console.log(res);
      localStorage.setItem("token",res.data.token)
      navigate('/login')
      
    }).catch((error)=>{
      console.log(error.response.data.message);
      setErroreMessage(error.response.data.message)
    }).finally(()=>{
      setIsLoding(false)
    })
  }

  let validationSchema=Yup.object().shape({
    name:Yup.string().min(3,'name must be at least 3').max(10,'name must be at max 10').required('name required'),
    email:Yup.string().email('email not valied').required('email required'),
    phone:Yup.string().matches(/^(010|011|012|015)[0-9]{8}$/,'phone must be egyption').required('phone required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'password starts with capital letter and min lenght 6').required('password required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'password & repassword must be the same').required('repassword required')
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
   validationSchema,
    onSubmit: handleRegister
  });

  return (
    <>
      <form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
        <h1 className="text-green-700 text-2xl my-3 font-bold">Register</h1>
        {erroreMessage?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{erroreMessage}</span> </div>:null}

        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "/>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">Name</label>
           {formik.errors.name  && formik.touched.name?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{formik.errors.name}</span> </div>:null}
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" " />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">Email</label>
          {formik.errors.email  && formik.touched.email?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{formik.errors.email}</span> </div>:null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "/>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">Password</label>
          {formik.errors.password  && formik.touched.password?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{formik.errors.password}</span> </div>:null}
        </div>

        {/* Repassword */}
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "/>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">Confirm Password</label>
          {formik.errors.rePassword  && formik.touched.rePassword?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{formik.errors.rePassword}</span> </div>:null}
        </div>

        {/* Phone */}
        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "/>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">Phone</label>
          {formik.errors.phone && formik.touched.phone?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{formik.errors.phone}</span> </div>:null}
        </div>

        <button disabled={isloding?true:false} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
         {isloding?<i className='fas fa-spin fa-spinner'></i>:"submit"}
        </button>
      </form>
    </>
  );
}
