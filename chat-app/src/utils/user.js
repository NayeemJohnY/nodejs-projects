const users = []

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) return { error: 'username and room are required' }

    const existingUser = users.find((user) => {
        return user.room == room && user.username == username
    })

    if (existingUser) {
        return { error: 'username already taken' }
    }

    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }

}


const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    getUser,
    getUsersInRoom,
    removeUser
}



// addUser({ id: 1, username: "nae e  ", room: "dadass" })
// console.log(users);
// addUser({ id: 2, username: "  ssss", room: "dadass" })
// console.log(users);
// res = addUser({ id: 3, username: "  ssss", room: "dadass" })
// console.log(res);
// console.log(users);
// res = addUser({ id: 3, username: "", room: "" })
// console.log(res);
// console.log(users);
// res = addUser({ id: 2, username: "ssss", room: "sss" })
// console.log(res);
// res = addUser({ id: 199, username: "aasss", room: "sss" })
// console.log(res);
// console.log(users);
// res = removeUser(3)
// console.log(res);
// console.log("================================================================");
// console.log(users);
// res = getUser(2)
// console.log(res);
// res = getUser(11)
// console.log(res);
// console.log(users);
// res = getUsersInRoom(11)
// console.log(res);
// addUser({ id: 11, username: 'ssss', room: "asss" })
// addUser({ id: 10, username: 'qaer', room: 'delvi' })
// addUser({ id: 9, username: 'yuiop', room: 'delvi' })
// console.log(users);
// res = getUsersInRoom('delvi')
// console.log(res);
// res = getUsersInRoom('ssss')
// console.log(res);