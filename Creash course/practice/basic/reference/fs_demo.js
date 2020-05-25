const fs  = require('fs')
const path  = require('path')

//Create folder
fs.mkdir(path.join(__dirname, '/test'), {}, (err)=>{
    if (err) throw err
    console.log('Foder created')
})

// Create and write to file
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'),'hello guys',
    err =>{
        if (err) throw err;
        console.log("File created ")
    }
)

// append to a file because  writeFile overide
fs.appendFile(path.join(__dirname, '/test', 'hello.txt'),'im learning nodejs',
    err =>{
        if (err) throw err;
        console.log("File created ")
    }
)


// read file 
// if you want read the file comment the code above 
// from create folder to the end of the append to file section
fs.readFile(path.join(__dirname, '/test', 'hello.txt'),'utf8',
    (err,data) =>{
        if (err) throw err;
        console.log(data)
    }
)

// rename a file
fs.rename(
    path.join(__dirname, '/test', 'hello.txt'),
    path.join(__dirname, '/test', 'hello2.txt'),
    (err,data) =>{
        if (err) throw err;
        console.log(data)
    }
)