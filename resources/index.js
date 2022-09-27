const socket = io("http://localhost:3000")
console.log("socket",socket)
const messageContainer = document.getElementById('message-bar');
const messageInput = document.getElementById("message-input")
const userName = document.getElementById("USER_NAME")
// const userName = document.getElementById("user-name")

function appendMessage({user,message}) {
  const messageElement = document.createElement('li');
  messageElement.innerHTML = /*html*/`
    <div>
      <p>user: ${user}</p>
      <p>message: ${message}</p>
    </div>
  `
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
    user:userName.value,
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
  userName.innerText = localStorage.getItem('userName');
}