const express  = require('express')
const path = require('path')
const exphbs = require('express-handlebars')





const logger = require('./middleware/logger')
const members = require('./Members');

const app = express()

// Handle bars middlware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// init Moddleware
app.use(logger)

// Body parser middlware
app.use(express.json())

app.use(express.urlencoded({extended : false}))

// Members route API
app.use('/api/members', require('./routes/api/members'));

//SET static folder
app.use(express.static(path.join(__dirname,'public')))
const PORT = process.env.PORT || 5000


app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))