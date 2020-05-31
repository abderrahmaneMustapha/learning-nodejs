let devSelectRoom = document.getElementById('selectRoom')
let divConsulingRoom = document.getElementById('consultingRoom')
let inputRoomNumber = document.getElementById('roomNumber')
let btnGoRoom = document.getElementById('goRoom')
let localVideo = document.getElementById('localVideo')
let remoteVideo = document.getElementById('remoteVideo')


let roomNumbe, localStream, remoteStream, rtcPeerConnection, isCaller

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