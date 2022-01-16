const express = require('express')
const app = express()
const http = require("http")
const cors = require('cors')
const { Server } = require('socket.io')

const path = require('path');
const db = require('./config/db/index')
const route = require('./routes')
require('dotenv').config({ path: __dirname + '/.env' })

app.use(cors());
const server = http.createServer(app);


const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

db.connect()
route(app)

//socket.io
const io = new Server(server, {
  cors: {
    origin: "https://appchatprevlife.netlify.app"
  }
})

let users = []
const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId })
}

io.on("connection", (socket) => {
  console.log(`some one connected at ${socket.id}`)

  //test
  io.emit("hello", "hello world")

  socket.on("joinConversation", data => {
    socket.join(data.c._id)
    console.log(`user with id ${data.user} join room ${data.c._id}`)
  })

  socket.on("sendMessage", data => {
    socket.to(data.ConversationId).emit("recieveMessage", data)
  })

  socket.on("disconnect", () => {
    console.log(`user disconnected`, socket.id)


  })
})


server.listen(PORT, () => { console.log(`server listen at http://localhost:${PORT}`) })