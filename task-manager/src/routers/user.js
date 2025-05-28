const express = require('express')
require("../db/mongoose")
const User = require("../models/user")
const router = new express.Router()
const auth = require("../middleware/auth")
const multer = require('multer')
const sharp = require('sharp')

router.post("/users", async(req, res) => {
    console.log(req.body);
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
})

router.post("/users/login", async(req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
            // res.send({ user: user.getPublicProfile(), token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.post("/users/logout", auth, async(req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({ message: "Log out success" })
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post("/users/logoutAll", auth, async(req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        res.send({ message: "All sessions were logged out" })
    } catch (err) {
        res.status(500).send(err)
    }
})


// router.get("/users", auth, async(req, res) => {
//     try {
//         const users = await User.find()
//         res.send(users)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
// Only current user profile not all users
router.get("/users/me", auth, async(req, res) => {
    res.send(req.user)
})

// router.get("/users/:id", async(req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

const upload = multer({
        // dest: "avatars",
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match('\.(jpg|jpeg|png)$')) {
                return cb(new Error("Please upload image"))
            }
            cb(undefined, true)
        }
    })
    //data:image/png;base64,
router.post("/users/me/avatar", auth, upload.single("avatars"), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        // req.user.avatar = req.file.buffer
    req.user.avatar = buffer
    await req.user.save()
    res.send(req.user)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete("/users/me/avatar", auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
})

router.get("/users/:id/avatar", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error("Avatar is not added to your profile")
        }
        // res.set('Content-Type', 'image/jpg').send(user.avatar)
        res.set('Content-Type', 'image/png').send(user.avatar)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

// router.patch("/users/:id", async(req, res) => {
//     // updating property does not exists
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         return res.status(400).send({ "error": "Invalid update" })
//     }
//     try {
//         const user = await User.findById(req.params.id)
//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()
//             // Due to this bypass the mongoose model
//             // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if (!user) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.patch("/users/me", auth, async(req, res) => {
    // updating property does not exists
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ "error": "Invalid update" })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
            // Due to this bypass the mongoose model
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!req.user) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.delete("/users/:id", async(req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) return res.status(404).send({ "error": "User not found for id: " + req.params.id })
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.delete("/users/me", auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send({ success: "User removed successfully", userInfo: req.user })
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router