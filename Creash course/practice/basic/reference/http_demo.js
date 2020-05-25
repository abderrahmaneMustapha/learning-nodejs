const http  = require('http')

// Create server object

http.createServer((req, res)=> {
    // Write response
    res.write('Hi there')
    res.end()
}).listen(
    5000,
    ()=> console.log('Server walking...')
)