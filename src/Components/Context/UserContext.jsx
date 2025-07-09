import { createContext, useState } from "react";

export let UserContext=createContext(0)
export default function UserContextProvider(props){
    let [usercounter,setusercounter]=useState(0)
    let [username,setusername]=useState('manar')
    return<UserContext.Provider value={{usercounter,username}}>
        {props.children}
    </UserContext.Provider>


}