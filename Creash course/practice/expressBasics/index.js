const express  = require('express')
const path = require('path')


const logger = require('./middleware/logger')
const members = require('./members')

const app = express()

// Get all memebers
app.get('/api/members', 
 (req, res)=> res.json(members)
)

// Get single Member
app.get('/api/members/:id', (req, res) =>{
    const found = members.some(member => member.id == req.params.id)
    
    if (found){
        res.json(members.filter(member => member.id == req.params.id))
    }
    else{
        res.status(400).json({msg : `No member with the id  ${req.params.id}`})

    }
})

// init Moddleware
app.use(logger)

//SET static folder
app.use(express.static(path.join(__dirname,'public')))
const PORT = process.env.PORT || 5000


app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))