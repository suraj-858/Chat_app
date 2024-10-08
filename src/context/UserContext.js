import React,{ createContext, useState } from "react";
import io from 'socket.io-client'
const socket = io.connect("https://chat-app-rho-pink.vercel.app/");

 export const userContext = createContext();
 

export const UserContext = ({children}) => {
     const setter = "suraj is online"
     const [useSocket , setUseSocket] = useState();


  return (
    <userContext.Provider  value = {{ socket,  setter, useSocket, setUseSocket}}>
        {children}
    </userContext.Provider>
  )
}




