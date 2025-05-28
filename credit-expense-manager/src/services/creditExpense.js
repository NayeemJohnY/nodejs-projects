const { logger } = require('../utils/logger');


// const addCreditExpenseEntry = async (req, res, next) => {
//     try {
//         const subscription = await insert(req.body, req.user._id)
//         res.status(201)
//             .send(subscription)
//     } catch (error) {
//         logger.error("EXCEPTION", error)
//         next(error)
//     }
// }

const getCreditExpenseEntries = async (req, res, next) => {


}


module.exports = {
    getCreditExpenseEntries
}