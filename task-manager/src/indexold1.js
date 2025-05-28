const express = require('express')
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const router = new express.Router()
// router.get("/test", (req, res) => {
//     res.send("router example")
// })

// app.use(router)



// app.post("/users", (req, res) => {
//     console.log(req.body);
//     const user = new User(req.body)
//     user.save().then(() => {
//         res.send(user)
//     }).catch(err => {
//         // send proper status code for errors
//         res.status(400).send(err)
//     })
// })

// app.get("/users", (req, res) => {
//     User.find().then((users) => {
//         res.send(users)
//     }).catch(err => {
//         res.status(500).send()
//     })
// })

// app.get("/users/:id", (req, res) => {
//     User.findById(req.params.id).then((user) => {
//         if (!user) return res.status(404).send("User not found for id: " + req.params.id)
//         res.send(user)
//     }).catch(err => {
//         res.status(500).send(err)
//     })
// })

// app.post("/tasks", (req, res) => {
//     console.log(req.body);
//     const task = new Task(req.body)
//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch(err => {
//         res.status(400).send(err)
//     })
// })

// app.get("/tasks", (req, res) => {
//     Task.find().then((tasks) => {
//         res.send(tasks)
//     }).catch(err => {
//         res.status(500).send()
//     })
// })

// app.get("/tasks/:id", (req, res) => {
//     Task.findById(req.params.id).then((task) => {
//         if (!task) return res.status(404).send("Task not found for id: " + req.params.id)
//         res.send(task)
//     }).catch(err => {
//         res.status(500).send(err)
//     })
// })

// Async
// app.post("/users", async(req, res) => {
//     console.log(req.body);
//     const user = new User(req.body)
//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })


// app.get("/users", async(req, res) => {
//     try {
//         const users = await User.find()
//         res.send(users)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.get("/users/:id", async(req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.patch("/users/:id", async(req, res) => {
//     // updating property does not exists
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         return res.status(400).send({ "error": "Invalid update" })
//     }
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if (!user) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// app.delete("/users/:id", async(req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.post("/tasks", async(req, res) => {
//     console.log(req.body);
//     const task = new Task(req.body)
//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// app.get("/tasks", async(req, res) => {
//     try {
//         const tasks = await Task.find()
//         res.send(tasks)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.get("/tasks/:id", async(req, res) => {
//     try {
//         const task = await Task.findById(req.params.id)
//         if (!task) return res.status(404).send({ "error": "Task not found for id: " + req.params.id })
//         res.send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.patch("/tasks/:id", async(req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     if (updates.length == 0) {
//         return res.status(400).send({ "error": "Nothing to update, Body is empty" })
//     }
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         return res.status(400).send({ "error": "Invalid update" })
//     }
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if (!task) return res.status(404).send({ "error": "Task not found for id: " + req.params.id })
//         res.send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.delete("/tasks/:id", async(req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if (!task) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
//         res.send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })


app.listen(port, () => {
    console.log("App is up and running on port " + port);
})