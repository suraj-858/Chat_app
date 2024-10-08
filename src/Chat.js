import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { userContext } from './context/UserContext';



function Chat({ username, room}) {
  const {setter, socket} = useContext(userContext);
  
  
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async() =>{
        if(currentMessage !== ""){
            const messageData = {
                room: room, 
                author: username, 
                message: currentMessage, 
                time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messageData);
            setMessageList((List) =>[...List, messageData])
            setCurrentMessage("");
        }
    };

    useEffect(() =>{
      socket.on("recieve_message", (data)=>{
        setMessageList((List) =>[...List, data])
      })
    }, [socket])
  return (
    <div className='chat-window'>
       <div className="chat-header">
       <h3>{setter}</h3>
       </div>
       <div className="chat-body">
        <ScrollToBottom className='message-container'>
        {messageList.map((messageContent)=>{
          return <div className='message' id={username === messageContent.author ? "you":"other"}>
            <div>
              <div className="message-content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                <p id='time'>{messageContent.time}</p>
                <p id='author'>{messageContent.author}</p>
              </div>
            </div>
          </div>
        })}
        </ScrollToBottom>
       </div>
       <div className="chat-footer">
        <input type="text"
        value={currentMessage}
         placeholder='Hey...'
          onChange={(event)=>{
            setCurrentMessage(event.target.value);
        }}
        onKeyDown={(event) =>{
          event.key === "Enter" && sendMessage();
          }} />
        <button onClick={sendMessage} >&#9658;</button>
       </div>
    </div>
  )
}

export default Chat
