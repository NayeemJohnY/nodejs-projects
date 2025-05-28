const path = require('path')
const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const { generateMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/user')



app = express();
const server = http.createServer(app)
const io = socketio(server)

publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath))

let count = 0
io.on('connection', (socket) => {
    console.log("WebSocket connection");

    socket.emit('message', "Hello Socket " + (++count))

})

server.listen(3000, () => {
    console.log("Chat App is up and running on port 3000");
});