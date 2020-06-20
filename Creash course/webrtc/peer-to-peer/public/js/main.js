let divSelectRoom = document.getElementById('selectRooms')
let divConsulingRoom = document.getElementById('consultingRoom')
let inputRoomNumber = document.getElementById('roomNumber')
let btnGoRoom = document.getElementById('goRoom')
let localVideo = document.getElementById('localVideo')
let remoteVideo = document.getElementById('remoteVideo')


let roomNumber, localStream, remoteStream, rtcPeerConnection, isCaller

const iceServers = {
    'iceServer' : [
        {'urls' :  'stun:stun.services.mozilla.com'},
        {'urls' : 'stun:'}
    ]
}

const streamConstraints = {
    audio : true,
    video : true
}

const socket = io()

btnGoRoom.onclick = () =>{
    if (inputRoomNumber.value === ''){
        alert('please type a room number')
    }else{
        roomNumber = inputRoomNumber.value
        socket.emit('create or join', roomNumber)
        divSelectRoom.style = "display : none"
        divConsulingRoom.style = "display : block"
    }
}

socket.on('created', room=>{
    navigator.mediaDevices.getUserMedia(streamConstraints)
    .then( stream=>{
        localStream = stream
        localVideo.srcObject = stream
        isCaller = true
    }).catch( err =>{
        console.log(" An error  occurred", err)
    })
})

socket.on('joined', room=>{
    console.log("someone joined the room")
    navigator.mediaDevices.getUserMedia(streamConstraints)
    .then( stream=>{
        localStream = stream
        localVideo.srcObject = stream
        socket.emit('ready', roomNumber)
    }).catch( err =>{
        console.log(" An error  occurred", err)
    })
})

socket.on('ready', ()=>{
    if(isCaller){
       
        rtcPeerConnection = new RTCPeerConnection(iceServers)
        rtcPeerConnection.onicecandidate = onIceCandidate
        rtcPeerConnection.ontrack = onAddStream
        rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream)
        rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)
        rtcPeerConnection.createOffer()
            .then(sessionDescription =>{
                console.log('sending offer')
                rtcPeerConnection.setLocalDescription(sessionDescription)
                socket.emit('offer', {
                    type : 'offer',
                    sdp: sessionDescription,
                    room: roomNumber
                })
            })
            .catch( err =>{
                console.log(err)
            })
    }
})


socket.on('offer', (event)=>{
    console.log('im offering this bfore condition')
    if(!isCaller){
        console.log('im offering this ',event )
        rtcPeerConnection = new RTCPeerConnection(iceServers)
        rtcPeerConnection.onicecandidate = onIceCandidate
        rtcPeerConnection.ontrack = onAddStream
        rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream)
        rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)
        rtcPeerConnection.setRemoteDescription( new RTCSessionDescription( event ))
        rtcPeerConnection.createAnswer()
            .then(sessionDescription =>{
                console.log('sneding answer')
                rtcPeerConnection.setLocalDescription(sessionDescription)
                socket.emit('answer', {
                    type : 'answer',
                    sdp: sessionDescription,
                    room: roomNumber
                })
            })
            .catch( err =>{
                console.log(err)
            })
    }
})

socket.on('answer', event =>{
    rtcPeerConnection.setRemoteDescription( new RTCSessionDescription(event))
})

socket.on('candidate',event =>{
    const candidate = new RTCIceCandidate({
        sdpMLineIndex : event.label,
        candidate : event.candidate,
    })

    rtcPeerConnection.addIceCandidate(candidate)
} )

function onAddStream (event){
    console.log("this is an event add stream ",event)
    remoteVideo.srcObject = event.streams[0]
    remoteStream = event.streams[0]
}

function onIceCandidate (event){
    if(event.candidate){
        console.log('sending ice candidate', event.candidate)
        socket.emit('candidate', {
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id : event.candidate.sdpMid,
            condidate : event.candidate.candidate,
            room : roomNumber
        })
    }
}

