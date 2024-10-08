
import { useContext, useState} from "react";
import Chat from "./Chat";
import './App.css'
import { userContext } from "./context/UserContext";


function App() {
  const {setter, socket} = useContext(userContext);
  console.log(setter);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
    if(username !== "" && room !==""){
      socket.emit("join_room", room);
      setShowChat(true)

    }
  }

  return (
    <div className="App">
      {!showChat ? (

          <div className="joinChatContainer">
          <h3>Join the Chat</h3>

          <input type="text"
           placeholder="Join.." 
           onChange ={(event)=>{
            setUsername(event.target.value)
            }}/>

          <input type="text"
           placeholder="Room Id"
            onChange= {(event) =>{
              setRoom(event.target.value)
              }} />

          <button onClick={joinRoom}>Join A Room</button>
          </div>

       )
      :
      (
      <Chat  username = {username} room = {room} /> 
      )}
    </div>
  );
}

export default App;
