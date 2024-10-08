import React,{ createContext, useState } from "react";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001");

 export const userContext = createContext();
 

export const UserContext = ({children}) => {
     const setter = " suraj is a goodboy"
     const [useSocket , setUseSocket] = useState();


  return (
    <userContext.Provider  value = {{ socket,  setter, useSocket, setUseSocket}}>
        {children}
    </userContext.Provider>
  )
}




