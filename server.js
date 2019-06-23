const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server).sockets;


app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});

let connnectedUser = [];

io.on("connection", socket => {
    console.log('a user connection')
    updateUserName();
    let userName = "";
    // 处理客户端自定义 login 事件
    socket.on('login', (name, callback) => {
        console.log(name, 'name');
        if (name.trim().length === 0 ) {
            return
        }

        callback(true);
        userName = name;
        connnectedUser.push(userName)
        console.log(connnectedUser, 'connnectedUser');
        updateUserName();
    });

    // 处理客户端自定义 chat message 事件
    socket.on('chat message', msg => {
        // 服务点打包data

        io.emit('output', {
            name: userName,
            msg,
        })
    })
    
    socket.on("disconnect", () => {
        console.log('a user disconnect')
        connnectedUser.splice(connnectedUser.indexOf(userName), 1);
        console.log(connnectedUser, 'connnectedUser');
        updateUserName();
    });

    function updateUserName () {
        io.emit('loadUser', connnectedUser)
    }
})



const port = process.env.PORT || 5000;

server.listen(port, ()=> console.log(`Server running on port ${port}`))