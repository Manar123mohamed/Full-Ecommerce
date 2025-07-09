import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useCategoryProducts(categoryId) {
    function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
  }
let requestOpject =  useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn:getCategories,
    enabled: !!categoryId,
    select: (data) => data.data.data
  })
  return requestOpject;
}