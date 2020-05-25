const path  = require('path')

//get full path 
console.log(__filename)

// get base file name
console.log(path.basename(__filename))

// get directory name
console.log(path.dirname(__filename))

// get file extension
console.log(path.extname(__filename))

// create a path object
console.log(path.parse(__filename))

//concatenate paths
console.log(path.join(__dirname, 'test', 'hello.html'))