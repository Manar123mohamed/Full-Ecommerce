import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound'
import Products from './Components/Products/Products'
import AuthContextProvider from './Components/Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Components/Context/CartContext'
import WishListContextProvider from './Components/Context/WishListContext'
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout'
import Orders from './Components/Orders/Orders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishList from './Components/WishList/WishList'
import ForGetPassword from './Components/ForGetPassword/ForGetPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import NewPassword from './Components/NewPassword/NewPassword'
import CategoreyProducts from './Components/CategoreyProducts/CategoreyProducts'




let query=new QueryClient() 
let x=createBrowserRouter([
  {
       path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'categoryproducts/:id',element:<ProtectedRoute><CategoreyProducts/></ProtectedRoute>},
      {path:'login',element:<Login/>},
      {path:'forgetpassword',element:<ForGetPassword/>},
      {path:'resetcode',element:<ResetCode/>},
      {path:'newpassword',element:<NewPassword/>},
      {path:'Ecommerce',element:<Login/>},
      {path:'register',element:<Register/>},

      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'productDetails/:id/:category',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'*',element:<Notfound/>},
      

    ]
  }
])

function App() {
  const [count, setCount] = useState(0)

  return <QueryClientProvider client={query}>
    <AuthContextProvider>
<CartContextProvider>
  <WishListContextProvider>

      <RouterProvider router={x}></RouterProvider>
     <Toaster />
     <ReactQueryDevtools initialIsOpen={false} />
  </WishListContextProvider>
  
 
</CartContextProvider>
  </AuthContextProvider> 
  </QueryClientProvider>
   
  
 
}

export default App
