const { logger } = require('../utils/logger');
const User = require('../models/user');
const ErrorResponse = require("../utils/errorResponse")


const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        await user.save()
        
        logger.debug("LOG", "Added user document to the user collection DB")
        res.status(201)
            .header('x-access-token', user.token)
            .send(user)
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}


const getUser = async (req, res, next) => {
    try {
        res.status(200).send(req.user)
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}


const updateUser = async (req, res, next) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            throw new ErrorResponse("Invalid field to update", 400)
        }
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        logger.debug("LOG", "Updated the user document in the user collection DB")
        res.status(200).header('x-access-token', req.user.token).send(req.user)
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}


const deleteUser = async (req, res, next) => {
    try {
        await req.user.remove()
        logger.debug("LOG", "User document is deleted from the user collection DB")
        res.send({ success: "User removed successfully", userInfo: req.user })
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        await user.save()
        logger.debug("LOG", 'Updated auth token for the user document')
        res.status(200)
            .header('x-access-token', user.token)
            .send(user)
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        req.user.token = undefined
        await req.user.save()
        logger.debug("LOG", 'Removed auth token for the user document')
        res.status(200).send({ message: "User logged out successfully" })
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    logout

}