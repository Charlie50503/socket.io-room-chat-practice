const socket = io("http://localhost:3000")
console.log("socket",socket)
const messageContainer = document.getElementById('message-bar');
const messageInput = document.getElementById("message-input")
const userNameLabel = document.getElementById("USER_NAME")
const userName = localStorage.getItem('userName');
const roomName = localStorage.getItem('roomName');

function leaveRoomMessage(data){
  const messageElement = document.createElement('li');
  if(data.userName!==userName){
    messageElement.classList.add('chat-item-another')
  }else{
    messageElement.classList.add("chat-item");
  }
  messageElement.innerHTML = /*html*/`
    <div class="chat-item-container">
      <span font="noto" class="fw-bold">${data.message}</span>
    </div>
  `
  
  messageContainer.append(messageElement);
}

function joinRoomMessage(data) {
  const messageElement = document.createElement('li');
  if(data.userName!==userName){
    messageElement.classList.add('chat-item-another')
  }else{
    messageElement.classList.add("chat-item");
  }
  messageElement.innerHTML = /*html*/`
    <div class="chat-item-container">
      <span font="noto" class="fw-bold">${data.message}</span>
    </div>
  `
  
  messageContainer.append(messageElement);
}

function appendMessage(data) {
  const messageElement = document.createElement('li');
  if(data.userName!==userName){
    messageElement.classList.add('chat-item-another')
  }else{
    messageElement.classList.add("chat-item");
  }
  messageElement.innerHTML = /*html*/`
    <div class="chat-item-container">
      <span font="noto" class="fw-bold">${data.userName}</span>:
      <span font="noto">${data.message}</span>
    </div>
  `
  
  messageContainer.append(messageElement);
}

socket.on("showMessage",(data)=>{
  console.log("showMessage",data);
  appendMessage(data)
})

socket.on("joinRoomMessage",(data)=>{
  console.log("joinRoomMessage",data);
  joinRoomMessage(data)
})

socket.on("leaveRoomMessage",(data)=>{
  console.log("leaveRoomMessage",data);
  leaveRoomMessage(data)
})

function joinRoom(){
  const data = {
    userName:userName,
    roomName:roomName
  }
  socket.emit("joinRoom",data)
  socket.emit("sendJoinRoomMessage",data)
}

function sendMessage(){
  if(!checkMessageInput()) {
    alert("請輸入內容")
    return 
  }

  const data = {
    userName:userName,
    roomName:roomName,
    message:messageInput.value
  }
  socket.emit("chat",data)
  messageInput.value = ""
}

function checkMessageInput(){
  if(messageInput.value!=="") return true
  return false
}

function checkMessageInput(){
  if(messageInput.value!=="") return true
  return false
}

function init(){
  setUserName()
  joinRoom()
}

function setUserName(){
  userNameLabel.innerText = userName
}