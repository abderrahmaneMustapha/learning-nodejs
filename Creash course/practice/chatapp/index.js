const express  = require('express')
const path = require('path')

const app = express()

const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static(path.join(__dirname,'public'), {
    extensions: ['html', 'css', 'js']
}))


app.get('chat/', (req, res)=> {
    res.render( 'chat', {title : "chat page"})
})

io.on('connection', (socket) =>{
    socket.on('nickname', (msg) => { 
        io.emit("nickname", msg)

    });

    socket.on('online', (nickname) => { 
        io.emit("online", nickname)
        socket.username = nickname;
    });

    
    socket.on('chat message', (msg)=>{
        io.emit("chat message", msg)
    })

    socket.on('disconnect', () => { 
        io.emit("disconnect", socket.username)
    });

   

    socket.on('stream', stream =>{
        console.log(stream)
        socket.broadcast.emit('stream', stream);
      
            
    });

})


app.get('video/', (req, res)=> {
    res.render( 'video', {title : "video page"})
})



PORT  = process.env.PORT  || 8000

var p  = 0 
http.listen( PORT, ()=> console.log(`Server started at ${PORT}`))