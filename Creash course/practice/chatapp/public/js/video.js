let Peer = require('simple-peer')
let socket = io()
const video  = document.querySelector('video')

let client = {}

// get stream
navigator.mediaDevices.getUserMedia({video:true, audio: true})
.then(stream => {})