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


// let count = 0;
// io.on('connection', (socket) => {
//     console.log("New WebSocket connection");
// socket.emit('countUpdate', count)
// socket.on('increment', () => {
//     count++;
//     // socket.emit('countUpdate', count)
//     io.emit('countUpdate', count)
// })
// })

// io.on('connection', (socket) => {
//     socket.emit('welcome', 'Welcome to the WebSocket io by nodejs')
// })

// io.on('connection', (socket) => {
//     socket.on('sendMessage', (message) => {
//         io.emit('sendMessage', message)
//     })
// })

// io.on('connection', (socket) => {
//     socket.on('sendMessage', (message, acknowledge) => {
//         socket.broadcast.emit('sendMessage', generateMessage(message))
//         acknowledge('Delivered')
//     })

//     socket.on('disconnect', () => {
//         io.emit('sendMessage', generateMessage("A user left"))
//     })

//     socket.on('shareLocation', (location, callback) => {
//         socket.broadcast.emit('shareLocation', generateMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
//         callback()
//     })
// })

// io.on('connection', (socket) => {
//     socket.emit('sendMessage', generateMessage('Welcome to the Chat App'))

//     socket.on('sendMessage', (message, acknowledge) => {
//         socket.emit('sendMessage', generateMessage(message))
//         acknowledge('Delivered')
//     })

//     socket.on('disconnect', () => {
//         io.emit('sendMessage', generateMessage("A user left"))
//     })

//     socket.on('shareLocation', (location, callback) => {
//         socket.emit('shareLocation', generateMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
//         callback()
//     })
// })


io.on('connection', (socket) => {
    console.log("New WebSocket Connection");


    socket.on("join", ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
            // socket.emit; io.emit; socket.broadcast.emit
            // io.to.emit; socket.broadcast.to.emit
        socket.emit('sendMessage', generateMessage('Admin', 'Welcome to the Chat App'))
        socket.broadcast.to(user.room).emit('sendMessage', generateMessage('Admin', `${user.username} has joined`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        callback()
    })

    socket.on('sendMessage', (message, acknowledge) => {
        const user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit('sendMessage', generateMessage(user.username, message))
        }
        acknowledge('Delivered')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.emit('sendMessage', generateMessage('Admin', `${user.username} left the room`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })

    socket.on('shareLocation', (location, callback) => {
        const user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit('shareLocation', generateMessage(user.username, `https://google.com/maps?q=${location.latitude},${location.longitude}`))
        }
        callback()
    })
})

server.listen(3000, () => {
    console.log("Chat App is up and running on port 3000");
});