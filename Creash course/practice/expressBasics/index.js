const express  = require('express')
const path = require('path')


const logger = require('./middleware/logger')
const members = require('./Members');

const app = express()

// init Moddleware
app.use(logger)

// Members route API
app.use('/api/members', require('./routes/api/members'));

//SET static folder
app.use(express.static(path.join(__dirname,'public')))
const PORT = process.env.PORT || 5000


app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))