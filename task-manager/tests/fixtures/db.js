const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


const user1_ID = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1_ID,
    name: 'John',
    email: "johnsmith@task-manager.com",
    password: "john@12345",
    tokens: [{
        token: jwt.sign({ _id: user1_ID }, process.env.JWT_SECRET)
    }]
}

const user2_ID = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2_ID,
    name: 'Smith',
    email: "smithJohn@task-manager.com",
    password: "smith@12345",
    tokens: [{
        token: jwt.sign({ _id: user2_ID }, process.env.JWT_SECRET)
    }]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 1",
    completed: false,
    owner: user1_ID,
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 2",
    completed: true,
    owner: user1_ID,
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 3",
    completed: false,
    owner: user2_ID,
}

const setupDB = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}

module.exports = {
    setupDB,
    user1,
    user1_ID,
    user2,
    user2_ID,
    task1,
    task2,
    task3
}