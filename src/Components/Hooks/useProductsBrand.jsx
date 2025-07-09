
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProductsBrand() {
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

let requestOpject = useQuery({
    queryKey: ['brands'], 
    queryFn: getBrands,
    select: (data) => data.data.data 
  })
  return requestOpject;
}

