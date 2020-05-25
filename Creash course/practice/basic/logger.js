const EventEmitter = require('events')
const uuid = require('uuid')

// uuid test
//console.log(uuid.v4())


class Logger extends EventEmitter{
    log(msg){
        // call event
        this.emit('message', {id: uuid.v4() , msg})
    }
}


module.exports = Logger

/*
const Logger = require('./logger')

const logger = new Logger()

logger.on('message', data =>{
    console.log("the data : ", data )
})

logger.log('hello there')
*/
