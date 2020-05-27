var socket = io();
document.getElementsByTagName('form')[0]
 .addEventListener('submit', (e)=>{
 
     e.preventDefault()
     message = document.getElementById('m')
     socket.emit('chat message', message.value )
     message.value = ""
     return false

 })

 socket.on('chat message', msg=>{
     li = document.createElement("li")
     li.appendChild(document.createTextNode(msg))
     document.getElementById('messages')
      .appendChild(li)
 })

 socket.on('connect', msg=>{
    alert(msg);
})

socket.on('disconnect', msg=>{
    alert(msg);
})