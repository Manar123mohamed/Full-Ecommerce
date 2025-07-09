import axios from "axios";
import { useState } from "react";
import { createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
export let CartContext=createContext(null);

export default function CartContextProvider({children}){
    const[loding,setLoding]=useState(false)
     const[cartDetails,setCartDetails ] =useState(null)
    let headers={
token:localStorage.getItem('token')
    }
    function addProductToCart(productId){
        axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId}
            ,{
                headers

        }).then(({ data }) => {
            console.log(data);
            setCartDetails(data)
            toast(data.message ||'  ✅', {
            position: 'top-right',
            });

       }).catch(({data})=>{
                console.log(error);
                toast(data.message,{
                position: 'top-right',
            })
        })

    }
    function getCart(){
        setLoding(true)
        axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers
        }).then(({data})=>{
            console.log(data);
            setCartDetails(data)
            
        }).catch((error)=>{
           console.log(error);
        }).finally(()=>{
            setLoding(false)
        })
    }
    function removeItem(productId){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then(({data})=>{
            setCartDetails(data)
            console.log(data);
            toast.success('product deleted successfuly')
            
        })
    }
    function clearCart(){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then(({data})=>{
            getCart()
            console.log(data);
            toast.success('cart Empty')
            
        })
    }
    function updateCartItem(productId,count){
            axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                count
            },{
                headers
            }).then(({data})=>{
                setCartDetails(data)
                
                console.log(data);
            toast.success('item update') 
            })
    }
    function checkOut(cartId,url,values){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:values
        },{
            headers
        })
    }

    
    useEffect(()=>{
getCart()
    },[])
    return <CartContext.Provider value={{addProductToCart,getCart,cartDetails,loding,removeItem,clearCart,updateCartItem,checkOut}}>
        {children}
    </CartContext.Provider>
   
}