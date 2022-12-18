const app = require('express')();
const server  = require("http").createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => { // when new socket is created
    console.log('socket is connected', socket)

    socket.on('chat', (payload) => { // create new chat event listner 
        console.log('socket is created for chat event',payload)

        io.emit('chat', payload) // broadcast the payload who ever is listening to chat event
    })
  // ...
});

server.listen(5000,()=>{
    console.log('socket is running on port 5000')
});