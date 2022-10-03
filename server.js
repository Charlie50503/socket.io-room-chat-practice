const express = require("express")
const app = express()
const port = 3000
const server = require("http").Server(app)

const users = []

const io = require("socket.io")(server,{
  cors: {
    origin: "*",
  },
})

io.on("connection",socket => {

  socket.on("joinRoom",(data)=>{
    console.log("joinRoom");
    if(!users[socket.id]) {
      users[socket.id] = {
        roomName:data.roomName,
        userName:data.userName
      }
    }
    socket.join(data.roomName)
  })
  console.log("connection ----");
  socket.on("sendJoinRoomMessage",(data)=>{
    console.log("sendJoinRoomMessage",data);
    socket.broadcast.to(data.roomName).emit("joinRoomMessage",{userName:data.userName,message:`${data.userName} 使用者進入聊天室`})
  })
  socket.on("chat",(data)=>{
    console.log("get message",data);
    io.in(data.roomName).emit("showMessage",data)
  })
  socket.on("disconnect",()=>{
    console.log("disconnect",socket.id);
    io.in(users[socket.id]?.roomName).emit("leaveRoomMessage",{userName:users[socket.id]?.userName,message:`${users[socket.id]?.userName} 使用者已經退出`})
    
    delete users[socket.id]
  })
})

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});