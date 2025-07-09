import { createContext, useEffect, useState } from "react";
export let AuthContext=createContext(0)
export default function AuthContextProvider({children}){
    const [token,setToken]=useState(localStorage.getItem('token'))
   
    
return <AuthContext.Provider value={{token,setToken}}>
{children}
</AuthContext.Provider>
}