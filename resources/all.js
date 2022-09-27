const socket = io("http://localhost:3000")
console.log("socket",socket)
const messageContainer = document.getElementById('message-bar');
const messageInput = document.getElementById("message-input")
function appendMessage(message) {
  const messageElement = document.createElement('li');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

socket.on("showMessage",(message)=>{
  appendMessage(message)
})

function sendMessage(){
  socket.emit("message",messageInput.value)
  messageInput.value = ""
}