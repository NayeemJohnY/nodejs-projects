const { logger } = require('../utils/logger');
const Subscription = require('../models/subscription');
const ErrorResponse = require("../utils/errorResponse")


const addSubscription = async (req, res, next) => {
    try {
        const subscription = await insert(req.body, req.user._id)
        res.status(201)
            .send(subscription)
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}


const getSubscription = async (req, res, next) => {
    try {
        const sort = {}
        const match = {}

        if (req.query.name) match.name = req.query.name
        if (req.query.startdate) match.date = { "$gte": req.query.startdate }
        if (req.query.enddate) match.date = {...match.date, "$lte": req.query.enddate }
        if (req.query.sortBy) {
            const sortField = req.query.sortBy.split('_')
            sort[sortField[0]] = sortField[1] === 'desc' ? -1 : 1
        }
        await req.user.populate({
            path: "subscriptions",
            match,
            options: {
                limit: req.query.limit !== undefined ? req.query.limit : 20,
                sort: sort !== undefined ? sort : sort.date=-1,
            },
            select : 'date name amount place phone  -_id -owner'

        })
        if(req.user.subscriptions){
            res.status(200).send(req.user.subscriptions)
        } else {
            res.status(404).send()
        }
        
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}


const updateSubscription = async (req, res, next) => {
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


const removeSubscription = async (req, res, next) => {
    try {
        await req.user.remove()
        logger.debug("LOG", "Subscription document is deleted from the user collection DB")
        res.send({ success: "Subscription removed successfully", userInfo: req.user })
    } catch (error) {
        logger.error("EXCEPTION", error)
        next(error)
    }
}


const insert = async (subscriptionData, owner) => {
    try {
        if (subscriptionData instanceof Array) {
            subscriptionData.forEach(subsciption => subsciption.owner = owner)
            return await Subscription.insertMany(subscriptionData)
        } else {
            let subscription = new Subscription({ ...subscriptionData, owner });
            return await subscription.save();
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addSubscription,
    getSubscription,
    updateSubscription,
    removeSubscription,

}