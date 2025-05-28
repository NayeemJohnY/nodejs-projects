const ErrorResponse = require('../utils/errorResponse')
const uuid = require('uuid')
let RefreshCookies = []

const RefreshCookie = (token, minutes) => ({
    token,
    expiresIn: new Date().getTime() + minutes * 60000
})

const createRefreshCookie = (token, minutes=15) => {
    cookie = RefreshCookie(token, minutes)
    RefreshCookies.push(cookie)
}

const isValidRefreshCookie = (token) => {
    cookie = RefreshCookies.find(cookie => cookie.token === token)
    if (!cookie) {
        throw new ErrorResponse("Invalid refresh cookie", 400)
    }
    if (cookie.expiresIn < new Date().getTime()) {
        RefreshCookies.pop(cookie)
        throw new ErrorResponse("Refresh cookie expired. Please create new one", 400)
    }
    if (cookie.expiresIn - new Date().getTime() === 60000) {
            RefreshCookies.pop(cookie)
            createRefreshCookie(token)
    }
    return true;
}

const getAppCookies = (req) => {
    const parsedCookies = {};
    if (req.headers.cookie) {
        const rawCookies = req.headers.cookie.split('; ');
        rawCookies.forEach(rawCookie => {
            const parsedCookie = rawCookie.split('=');
            parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });
    }
    return parsedCookies;
};


const cookieHandler = async (req, res, next) => {
    if ((req.method === "POST"  && req.path === '/user' ) || req.path === '/user/login') {
        logger.debug('LOG', "ByPass authentication for create user && login API request");
    } else {
        let connectionCookie = getAppCookies(req)["connection_id"]
        try {
            isValidRefreshCookie(connectionCookie)
        } catch (error){
            logger.error("EXCEPTION", error);
            next(error);
        }
    }
    next()
}


module.exports = cookieHandler