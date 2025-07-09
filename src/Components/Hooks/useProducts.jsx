import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { data } from 'react-router-dom'

export default function useProducts() {
    function getRecent(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
 }
 let requestOpject =useQuery({
  queryKey:['recentProducts'],
  queryFn:getRecent,
  select:(data)=>data.data.data
 })
  return requestOpject;
   
}
// 