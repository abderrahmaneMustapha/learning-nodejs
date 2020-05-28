const express  = require('express')
const path = require('path')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'public'), {
    extensions: ['html', 'css', 'js']
}))


app.get('chat/', (req, res)=> {
    res.render( 'chat', {title : "home page"})
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

   
})
PORT  = process.env.PORT  || 8000

var p  = 0 
http.listen( PORT, ()=> console.log(`Server started at ${PORT}`))