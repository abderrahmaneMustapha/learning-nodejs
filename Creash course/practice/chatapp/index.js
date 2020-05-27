const express  = require('express')
const path = require('path')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'public')))


app.get('/', (req, res)=> {
    res.render( 'index', {title : "home page"})
})

io.on('connection', (socket) =>{
    socket.on('nickname', (msg) => { 
        io.emit("nickname", msg)
    });

    
    socket.on('chat message', (msg)=>{
        io.emit("chat message", msg)
    })

    socket.on('disconnect', () => { 
        io.emit("disconnect", "a user has been diconnected ")
    });

   
})
PORT  = process.env.PORT  || 8000

http.listen( PORT, ()=> console.log(`Server started at ${PORT}`))