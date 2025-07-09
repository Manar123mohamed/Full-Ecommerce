import React, { useContext, useEffect, useState } from 'react';
import style from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../Context/AuthContext';


export default function Login() {
  const[erroreMessage,setErroreMessage]=useState(null);
  const[isloding,setIsLoding]=useState(null)
  const navigate = useNavigate();
let {setToken}=useContext(AuthContext)
  async function handleLogin(values) {
    
    setIsLoding(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    .then((res)=>{
  setToken(res.data.token)
      console.log(res);
      localStorage.setItem("token",res.data.token)
      navigate('/')
      
    }).catch((error)=>{
      console.log(error.response.data.message);
      setErroreMessage(error.response.data.message)
    }).finally(()=>{
      setIsLoding(false)
    })
  }

  let validationSchema=Yup.object().shape({
    email:Yup.string().email('email not valied').required('email required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'password starts with capital letter and min lenght 6').required('password required'),
  })


  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
     
    },
   validationSchema,
    onSubmit: handleLogin
  });

  return (
    <>
      <form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
        <h1 className="text-green-700 text-2xl my-3 font-bold">Login</h1>
        {erroreMessage?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{erroreMessage}</span> </div>:null}

    
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" " />
          <label htmlFor='floating-email' className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">Email</label>
          {formik.errors.email  && formik.touched.email?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{formik.errors.email}</span> </div>:null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "/>
          <label htmlFor='floating-email' className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">Password</label>
          {formik.errors.password  && formik.touched.password?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium">{formik.errors.password}</span> </div>:null}
        </div>
        <div className="flex justify-between mt-4">
        <Link to="/forgetpassword" className="!text-red-700 hover:underline">
          Forgot Password?
        </Link>

        <button disabled={isloding?true:false} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
         {isloding?<i className='fas fa-spin fa-spinner'></i>:"login"}
        </button>
      </div>

  

 
      </form>
      <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
    </>
  );
}
