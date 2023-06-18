require('dotenv').config();
require('./db/conn');
const express = require('express');
const cors = require('cors');
const Router = require('./routes/router');
const { ExpressPeerServer } = require("peer");
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log("Starting server on port " + PORT);
});
var userCount = 0;

const peerServer = ExpressPeerServer(server, {
    debug: true,
});
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        method: ["GET", "POST"],
    }
});

// Middleware   
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST','GET','DELETE','PUT'],
    credentials: true
}));
app.use('/peerjs', peerServer);
app.use('/api',Router);


app.get('/',(req,res)=>{
    res.send("Server listening");
    console.log("Hello");
});

// --------------Socket________-------
io.on('connection', (socket) => {  
    console.log('Connection established'); 
    userCount++;
    console.log("User count: " + userCount);
    socket.emit('usercnt', userCount);
    socket.broadcast.emit('usercnt', userCount);

    
    // for check the peer id 
    socket.on('id', (id) => {
        // console.log(id);
    });
    
    socket.on('disconnect', () => {
        // socket.broadcast.emit("callended");
        userCount--;
    socket.emit('usercnt', userCount);
        socket.broadcast.emit('usercnt', userCount);
    })
    
    socket.on("calluser",({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("calluser", {signal: signalData, from: from, name: name});
    })
    
    socket.on('answercall', (data)=>{
        io.to(data.to).emit("callaccepted", data.signal);
    });
});

