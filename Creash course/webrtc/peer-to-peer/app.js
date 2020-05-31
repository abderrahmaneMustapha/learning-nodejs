const express = require('express')
const app = express()
let http  = require('http').Server(app)

const port = process.env.PORT || 8000

app.use(express.static('public'))

http.listen(port, ()=>{
    console.log('listening on port', port)
})