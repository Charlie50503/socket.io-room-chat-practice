const express = require("express")
const app = express()
const port = 3000
const server = require("http").Server(app)
const io = require("socket.io")(server,{
  cors: {
    origin: "*",
  },
})

io.on("connection",socket => {
  console.log("connection ----");
  socket.on("join",()=>{
    socket.broadcast.emit("使用者進入聊天室")
  })
  socket.on("message",(message)=>{
    console.log("get message",message);
    socket.broadcast.emit("showMessage",message)
  })
  socket.on("disconnect",()=>{
    socket.broadcast.emit("使用者已經退出")
  })
})

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});