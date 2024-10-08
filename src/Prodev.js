import React, { useContext } from 'react'
import { userContext } from './context/UserContext'

function Prodev({socket}) {
    const {setUseSocket} = useContext(userContext);
    setUseSocket(socket);
  return (
    <div>
      
    </div>
  )
}

export default Prodev
