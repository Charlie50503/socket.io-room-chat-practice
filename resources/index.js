const socket = io("http://localhost:3000")
console.log("socket",socket)
const messageContainer = document.getElementById('message-bar');
const messageInput = document.getElementById("message-input")
const userNameLabel = document.getElementById("USER_NAME")
const userName = localStorage.getItem('userName');
// const userName = document.getElementById("user-name")

function appendMessage({user,message}) {
  const messageElement = document.createElement('li');
  messageElement.innerHTML = /*html*/`
    <div class="chat-item-container">
      <span font="noto" class="fw-bold">${user}</span>:
      <span font="noto">${message}</span>
    </div>
  `
  messageElement.classList.add("chat-item");
  messageContainer.append(messageElement);
}

socket.on("showMessage",({user,message})=>{
  appendMessage({user,message})
})

function sendMessage(){
  if(!checkMessageInput()) {
    alert("請輸入內容")
    return 
  }

  const data = {
    user:userName,
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
}

function setUserName(){
  userNameLabel.innerText = userName
}