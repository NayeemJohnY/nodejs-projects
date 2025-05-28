const express = require('express');
const fs = require('fs');
app = express();

const userJsonFile = fs.readFileSync('users-app/users.json');
const userData = JSON.parse(userJsonFile.toString())

app.get('', (req, res) => {
    res.send("This is API backed to Node js")
})

app.get('/api/users', (req, res) => {
    groupName = req.query.group
    users = userData
    if (groupName) {
        users = users.filter(user => user.groups && user.groups.find(group => group.name == groupName))
            .flatMap(user => [{ id: user.id, name: user.name }])
        res.send(users)
    } else {
        res.send(users)
    }
})


app.get('/api/users/:id', (req, res) => {
    user = userData.find(user => user.id == req.params.id)
    if (user)
        res.send(user)
    else
        res.send("User with id : " + req.params.id + " is not found")
})


app.post('/api/users', (req, res) => {
    console.log(req);
    if (req.body) {
        fs.writeFileSync('users.json', req.body)
    } else {
        res.send("Not a valid payload for user")
    }
})

app.listen(3000, () => {
    console.log("API Server is up & Running");
})