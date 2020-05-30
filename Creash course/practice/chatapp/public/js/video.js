let Peer = require('simple-peer')
let socket = io()
const video  = document.querySelector('video')

let client = {}

// get stream
navigator.mediaDevices.getUserMedia({video:true, audio: true})
.then(stream => {
  
  socket.emit('NewClient')
  video.srcObject = stream
  video.play()

  InitPeer  = type =>{
    let peer = new Peer(
      {
        initiator : (type == 'init') ? true : false,
        stream : stream,
        trickle : false
      }

    )

    peer.on('stream', stream =>{
     
      CreateVideo(stream)
    })
   /*
    peer.on('close', ()=>{
      document.getElementById('peerVideo').remove()
      peer.destroy()
    } )
    */

    return peer
  }

  MakePeer = ()=>{
    client.gotAnswer = false
    let peer = InitPeer('init')
    peer.on('signal', (data)=>{
      if(!client.gotAnswer){
        socket.emit('Offer', data)
      }
    })

    client.peer = peer

  }

  FrontAnswer = (offer)=>{
    let peer = InitPeer('notInit')
    peer.on('signal', (data) => {
      socket.emit('Answer', data)
    })
    peer.signal(offer)
    client.peer = peer
  }

  SignalAnswer = (answer)=>{
    client.gotAnswer = true
    let peer  = client.peer
    peer.signal(answer)
  }

  CreateVideo = (stream)=>{
    let video = document.createElement('video')

    video.id = 'peerVideo'
    video.srcObject = stream
    console.log(video)
    document.getElementById("videos").appendChild(video)
    video.play()
  }

  SessionActive = ()=>{
    document.write('session active please comeback later')
  }

  socket.on('BackOffer', FrontAnswer)
  socket.on('BackAnswer', SignalAnswer)
  socket.on('SessionActive', SessionActive)
  socket.on('CreatePeer', MakePeer)

})