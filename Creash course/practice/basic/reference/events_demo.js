const myEvent = require('events') 

// Create class
class Emitter extends myEvent{}

// Init object
const myEmitter = new Emitter()

// Event listener
myEmitter.on('event', () => console.log('Event Fired'))

// init event
myEmitter.emit('event')
myEmitter.emit('event')
myEmitter.emit('event')
myEmitter.emit('event')