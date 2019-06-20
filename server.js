const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server).sockets;


app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", socket => {
    console.log('a user connection')

    socket.on("disconnect", () => {
        console.log('a user connection')
    })
})



const port = process.env.PORT || 5000;

server.listen(port, ()=> console.log(`Server running on port ${port}`))