let divSelectRoom = document.getElementById('selectRooms')
let divConsulingRoom = document.getElementById('consultingRoom')
let inputRoomNumber = document.getElementById('roomNumber')
let btnGoRoom = document.getElementById('goRoom')
let localVideo = document.getElementById('localVideo')
let remoteVideo = document.getElementById('remoteVideo')

console.log(divSelectRoom)
console.log(divConsulingRoom)
console.log(inputRoomNumber)
console.log(btnGoRoom)
console.log(localVideo)
console.log(remoteVideo)
let roomNumber, localStream, remoteStream, rtcPeerConnection, isCaller

const icsServer = {
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
        console.log(" An error  occurred")
    })
})
