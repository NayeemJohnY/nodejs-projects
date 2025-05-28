const ErrorResponse = require('../utils/errorResponse');
const {logger} = require('../utils/logger')



const errorHandler = (err, req, res, next) => {

    let error = {...err}
    error.message = err.message

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    } 
    else if(err.code === 11000){
        error = new ErrorResponse(err.message, 409);
    }
    else if(!error.statusCode){
            error = new ErrorResponse(err.message, 400);
    }
    logger.debug("LOG", `Error Response to the Client :  ${JSON.stringify(error.message)}`);
    res.status(error.statusCode).json({ reasons: error.message })
}

module.exports = errorHandler;