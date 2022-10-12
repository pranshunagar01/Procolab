// procolab-chat-socket-server v1.0.0

// This is the backend server code for Procolab's real-time chat functionality. It uses the Socket.io library to handle the real-time communication between the client and the server. */

// Import the express library
const express = require("express");

// Create an express app
const app = express();

// CORS is a library that allows us to make requests to our server from a different domain
const cors = require("cors");

// Use CORS
app.use(cors());

// Import the http library
const http = require("http");

// Create an http server
const server = http.createServer(app);

// Import the socket.io library
const {Server} = require("socket.io");

// Create a socket.io server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://procolab-v1.herokuapp.com"],
        methods: ["GET", "POST"]
    }
});

// On a connection event, run the following code
io.on("connection", (socket)=>{
    // On a join_room event, run the following code with the data passed in
    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`${socket.id} has joined the Room: ${data}`)
    })
    // On a send_message event, run the following code to send the message to the room
    socket.on("send_message", (data)=>{
        console.log(data);
        socket.to(data.room).emit("receive_message", {message: data.message, author: data.author, time: data.time});
    })
    // On a disconnect event, run the following code to log the socket id of the disconnected user
    socket.on("disconnect", ()=>{
        console.log(`${socket.id} has disconnected`)
    })
})

// Listen on port 3003 and log a message to the console
server.listen(process.env.PORT || 3003, function(){
    console.log("The server has started at 3003.");
})
