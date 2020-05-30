const express  = require('express')
const path = require('path')

const app = express()

const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use(express.static(path.join(__dirname,'public'), {
    extensions: ['html', 'css', 'js']
}))


app.get('chat/', (req, res)=> {
    res.render( 'chat', {title : "chat page"})
})

app.get('video/', (req, res)=> {
    res.render( 'video', {title : "video page"})
})


/* Video Clients List */
let clients = 0
console.log('client in the start', clients)
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

   




    /* Videos chat part */

    socket.on("NewClient", ()=>{  
        console.log(clients)     
        if (clients < 4) {
           
                socket.emit('CreatePeer')
            
        }
        else
        socket.emit('SessionActive')
        clients++;
    })

    socket.on('Offer', offer =>{
        socket.broadcast.emit("BackOffer", offer)
    })
    socket.on('Answer', data =>{
        socket.broadcast.emit("BackAnswer", data)
    })
    socket.on('disconnect', ()=>{
        if (clients > 0) {
            if (clients <= 2)
                socket.broadcast.emit("Disconnect")
            clients--
        }
    })
    
})




PORT  = process.env.PORT  || 8000

var p  = 0 
http.listen( PORT, ()=> console.log(`Server started at ${PORT}`))