const express = require('express')
require("../db/mongoose")
const Task = require("../models/task")
const router = new express.Router()
const auth = require("../middleware/auth")

router.post("/tasks", auth, async(req, res) => {
    console.log(req.body);
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /tasks
// GET /tasks?completed=true : filtering
// GET /tasks?limit=10&skip=10 : pagination
//GET /tasks?sortBy=createdAt_desc : Sorting
router.get("/tasks", auth, async(req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) match.completed = req.query.completed
    if (req.query.sortBy) {
        const sortField = req.query.sortBy.split('_')
        sort[sortField[0]] = sortField[1] === 'desc' ? -1 : 1
    }
    try {
        // await req.user.populate("tasks")
        await req.user.populate({
            path: "subscriptions",
            match,
            options: {
                limit: req.query.limit,
                skip: req.query.skip,
                sort: sort
            }
        })
        res.send(req.user.tasks)
            // const tasks = await Task.find()
            // res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/tasks/:id", auth, async(req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) return res.status(404).send({ "error": "Task not found for id: " + req.params.id })
        res.send(task)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.patch("/tasks/:id", auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    if (updates.length == 0) {
        return res.status(400).send({ "error": "Nothing to update, Body is empty" })
    }
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ "error": "Invalid update" })
    }
    try {
        // const task = await Task.findById(req.params.id)
        // Fetch task only user created
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
            // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) return res.status(404).send({ "error": "Task not found for id: " + req.params.id })
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete("/tasks/:id", auth, async(req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) return res.status(404).send({ "error": "Task not found for id: " + req.params.id })
        res.send({ task, deleted: true })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router