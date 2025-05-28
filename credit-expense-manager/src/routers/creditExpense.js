const express = require('express');
const creditExpenseService = require('../services/creditExpense')
const router = express.Router()

router
    .route("/")
    // .post(subscriptionService.addSubscription)
    .get(creditExpenseService.getCreditExpenseEntries)
    // .put(subscriptionService.updateSubscription)
    // .delete(subscriptionService.removeSubscription)

module.exports = router