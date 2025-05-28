const express = require('express');
const morgan = require('morgan')
const userRouter = require('./routers/user')
const subscriptionRouter = require('./routers/subscription')
const creditExpenseRouter = require('./routers/creditExpense')
const { logger} = require('./utils/logger')
const additionalRouter  = require('./routers/additional')
const errorHandler = require('./middleware/error');
const path = require('path');
const authentication = require('./middleware/authentication');
const cookieHandler = require('./middleware/cookieHandler');

const app = express();

publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath))
app.use(express.json())


app.use(morgan(':remote-addr :url :method HTTP/:http-version :user-agent', {
    immediate: true,
    stream: {
        write: (message) => {
            logger.info('APIENTRY', message);
        }
    }
}));
app.use(morgan(":remote-addr :url :method  :req[Content-length] :status :response-time ms", {
    stream: {
        write: (message) => {
            logger.info('APIEXIT', message);
        }
    }
}));

// app.use(cookieHandler)
app.use(authentication)
app.use("/user", userRouter)
app.use("/subscription", subscriptionRouter)
app.use(creditExpenseRouter)
app.use(additionalRouter)
app.use(errorHandler)


app.listen(process.env.PORT, () => {
    logger.info("LOG", "App is started/restarted", "\n================================================================================================================================\n")
    logger.info("LOG", "Credit-Expense Manager App is Up and running on port", process.env.PORT);
})



