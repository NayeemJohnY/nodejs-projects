const express = require('express')
const userService = require("../services/user")
const router = express.Router();


router
    .route("/")
    .post(userService.createUser)
    .get(userService.getUser)
    .put(userService.updateUser)
    .delete(userService.deleteUser)

router
    .route("/login")
    .post(userService.login)

router
    .route("/logout")
    .post(userService.logout)

module.exports = router