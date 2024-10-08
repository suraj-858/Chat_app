const  express = require("express")
const app = express();
const cors = require("cors")
const {Server} = require("socket.io")
const http = require("http")
const dotenv = require('dotenv')

app.use(cors())
dotenv.config();

const server = http.createServer(app);

const io =  new Server(server,{
    cors: {
        origin: process.env.Backend_URL, 
        methods:["GET" ,"POST"],
    }
})

io.on("connection", (socket)=>{
    console.log(` User connected to : ${socket.id}`)
    
    socket.on("join_room", (data) =>{
        console.log(data);
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data)=>{

        socket.to(data.room).emit("recieve_message", data);
        console.log(data.room)
        // console.log(data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});


server.listen(3001, () =>{
    console.log("SERVER RUNNING");
})