客户端：


1.网页 UI 使用 MaterializeCss

const socket = io();

<!-- 自定义事件发送给服务端 -->
socket.emit('hello', data);

socket.on('nohello', data => {
    <!-- data 为服务端处理完的数据 -->
})



服务端：


1.使用 Socket.io 和 ExpressJS 作为服务端
· Socket.io

    const io = require('socket.io')

    事件：
     <!-- 当客户端 socket 被创建的时候，客户端会向服务端发送一个 connection 事件， 服务端用 connection 事件监听  -->
     io.on ('connection', socket => {
        
        socket.on ('disconnection', () => {
            <!-- 失去链接 -->
        });

        <!-- 监听客户端发送的事件 -->
        socket.on('hello', data => {
            <!-- 处理data 发送给前端 -->
            io.emit('nohello', data)
        });
    })

    指定命名空间、广播消息、


    Socket.IO 的核心理念就是允许发送、接收任意事件和任意数据。任意能被编码为 JSON 的对象都可以用于传输。二进制数据 也是支持的。

    
部署：

1. 使用 heroku 自动打包部署
heroku create
