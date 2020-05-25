const http  = require('http')
const path =  require('path')
const fs = require('fs')

// Create server object

const server = http.createServer((req, res)=> {
    // Write response
    
    if (req.url === '/'){
        fs.readFile(
            path.join(__dirname, 'public', 'home.html', ),
            (err, content)=>{
                if(err) throw err;
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end(content);
                
            }
        )
  
    }

    // RestAPI 
    if (req.url === '/api/users'){
      const users = [
          {name :  "Toumi Abderrahmane", age :  21},
          {name :  "Toumi Abderrahmane", age :  21},
          {name :  "Toumi Abderrahmane", age :  21},
      ]
      res.writeHead(200, {'Cotent-Type': 'application/json'})
      res.end(JSON.stringify(users))
  
    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})