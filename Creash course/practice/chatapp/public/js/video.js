var socket = io();
navigator.mediaDevices.getUserMedia({
    video  : true,
    audio: true
})
.then(stream =>{
    document.getElementById('video').srcObject = stream
    socket.emit("stream", stream);
})

socket.on('stream', stream=>{

    video = document.createElement("video")
    video.srcObject = stream
    video.setAttribute('autoplay')
    document.getElementById("videos").appendChild(video)
})