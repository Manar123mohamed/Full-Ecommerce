
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// export default function useProductsBrand() {
//   function getCategory() {
//     return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
//   }

// let requestOpject = useQuery({
//     queryKey: ['category'], 
//     queryFn: getCategory,
//     select: (data) => data.data.data 
//   })
//   return requestOpject;
// }
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProductCategory() {
  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let requestOpject =  useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    select: (data) => data.data.data
  })
  return  requestOpject ;
}


