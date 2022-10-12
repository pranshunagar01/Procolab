// procolab-code-socket-server v1.0.0

// This is the backend server for real-time code collaboration functionality of ProCoLab. 
// It is a Node.js server that uses Socket.io to communicate with the frontend.
// It is designed to be used with the ProCoLab code editor, but can be used with any code editor that supports Socket.io.

// Express is a Node.js web application framework that provides a robust set of features for web and mobile applications.
const express = require("express");

// Create an Express application.
const app = express();

// cors is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require("cors");

// Create a CORS middleware.
app.use(cors());

// http is a Node.js module that enables Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
const http = require("http");

// Create an HTTP server.
const server = http.createServer(app);

// socket.io enables real-time bidirectional event-based communication.
const {Server} = require("socket.io");

// Create a Socket.io server.
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://procolab-v1.herokuapp.com"],
        methods: ["GET", "POST"]
    }
});

// Create a map of Socket.io rooms.
io.on("connection", (socket)=>{
    // When a user joins a room, add them to the room.
    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`${socket.id} has joined the Room: ${data}`)
    })
    // On receiving the event send_code, send the code to all users in the room.
    socket.on("send_code", (data)=>{
        console.log(data.code);
        socket.to(data.room).emit("receive_code", data);
    })
    // On receiving the event disconnect, disconnect the user and log the event.
    socket.on("disconnect", ()=>{
        console.log(`${socket.id} has disconnected`)
    })
})

// Listen on port 3001 and log the event.
// process.env.PORT is used for deployment on Heroku and 3001 is used for local development.
server.listen(process.env.PORT || 3001, function(){
    console.log("The server has started at 3001.");
})
