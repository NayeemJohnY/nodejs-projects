require("../db/mongoose")

const User = require("../models/user")
const Task = require("../models/task")


// change the age of user and fetch the user with same age

// User.findByIdAndUpdate('61ebecae626cd8de619f3256', { age: 1 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 0 });
// }).then((result) => {
//     console.log("Result ", result);
// }).catch((err) => {
//     console.log("Error ", err);
// })

// Task.findByIdAndDelete("61ebd216373dc9af272b7292").then((result) => {
//     console.log(result);
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log("Result ", result);
// }).catch((err) => {
//     console.log("Error ", err);
// })


// Async wait
const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = User.countDocuments({ age })
    return count
}

// updateAgeAndCount('61ebcffc0d0ccf5769247a11', 2).then((count) => {
//     console.log("Result ", count);
// }).catch((err) => {
//     console.log("Error ", err);
// })


// const deletetaskAndCount = async(id, completed) => {
//     const task = await Task.findByIdAndDelete(id)
//     const count = Task.countDocuments({ completed })
//     return count
// }

// deletetaskAndCount('61ebef1acb4268ade8a494c1', false).then((count) => {
//     console.log("Result ", count);
// }).catch((err) => {
//     console.log("Error ", err);
// })

// const bcrypt = require('bcrypt')
// const passwordFun = async(password) => {
//     const hashPassword = await bcrypt.hash(password, 8)
//     console.log(hashPassword);

//     const isMatch = await bcrypt.compare("Pass@12345", hashPassword)
//     console.log(isMatch);
// }

// passwordFun("pass@12345")


// const jwt = require('jsonwebtoken')
// const jwtfunc = async() => {
//     const token = jwt.sign({ _id: 'dummyID' }, process.env.JWT_SECRET, { expiresIn: "7 seconds" })
//     console.log(token);

//     const data = jwt.verify(token, process.env.JWT_SECRET)
//     console.log(data);
// }

// jwtfunc()


// const pet = {
//     name: "Nadeeem"
// }

// pet.toJSON = function() {
//     console.log(this);
//     return this
// }
// console.log(JSON.stringify(pet));


// const test = async() => {
//     // Find user of the task
//     // const task = await Task.findById("61ed1080509a94df93dd6f03")
//     // await task.populate('owner')
//     // console.log(task.owner);

//     // Find tasks for the user
//     const user = await User.findById('61ed0fd4bdb5233ab29bd276')
//     await user.populate('tasks')
//     console.log(user.tasks);
// }
// test()

// delete all task of deleted user
// 1. in user delete router , delete all tasks  2. using middleware delete the task