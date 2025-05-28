const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const { logger } = require('../utils/logger');



const authentication = async (req, res, next) => {
    try {
        if ((req.method === "POST" && req.path === '/user') || req.path === '/user/login') {
            logger.debug('LOG', "ByPass authentication for create user && login API request");
        } else {
            logger.debug('LOG', "Middleware: Authenticating the request");
            const token = req.header('Authorization') ? req.header('Authorization').replace("Bearer ", "") : ''
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            query = { _id: decode._id, email: decode.email, role: decode.role, token: token }
            if (decode.role) {
                query.role = decode.role
            }
            const user = await User.findOne(query)
            if (!user) {
                throw new ErrorResponse('Invalid token. Please pass the valid token', 400)
            }
            req.token = token
            req.user = user
        }
        next()
    } catch (error) {
        logger.error('EXCEPTION', error)
        next(error)
    }
}

module.exports = authentication