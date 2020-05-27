var socket = io();
let  username = ""
get_nickname = ()=>{
    nickname = document.getElementById('nickname').value
    document.getElementById('nickname-form-container').setAttribute('class', 'none')
    document.getElementById("chat").setAttribute('class', 'visible row')

    if(!nickname){
    nickname = 'guest'

    }
     
    socket.emit('nickname', `a new user is online ${nickname}`)
    socket.emit('online', nickname)
    alert(`your username is  ${nickname}`)
    username  = nickname
    
  }


document.getElementById('message-form')
 .addEventListener('submit', (e)=>{
 
     e.preventDefault()
     message = document.getElementById('m')
     socket.emit('chat message', `${username}  : ${message.value}` )
     message.value = ""
     return false

 })



 socket.on('chat message', msg=>{
     li = document.createElement("li")
     li.appendChild(document.createTextNode(msg))
    
     
     document.getElementById('messages')
      .appendChild(li)
 })


 socket.on('nickname', (msg)=>{
    alert(msg)
})

socket.on('online', (nickname)=>{

    li = document.createElement("li")
    li.innerHTML = `${nickname}  <p >online</p>`
    li.setAttribute('class', 'd-flex justify-content-between pl-1')
    document.getElementById('connected')
    .appendChild(li)
})

socket.on('disconnect', msg=>{
    alert(msg);
})