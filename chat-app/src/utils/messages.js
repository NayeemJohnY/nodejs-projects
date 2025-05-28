const generateMessage = (username, text) => {
    username = username ? username : 'bot'
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}


module.exports = {
    generateMessage,
}