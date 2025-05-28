const express = require('express');
const subscriptionService = require("../services/subscription")
const router = express.Router()

router
    .route("/")
    .post(subscriptionService.addSubscription)
    .get(subscriptionService.getSubscription)
    .put(subscriptionService.updateSubscription)
    .delete(subscriptionService.removeSubscription)


module.exports = router