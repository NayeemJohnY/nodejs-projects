const mongoose = require('mongoose');
const { logger } = require('../utils/logger')

let options = {
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    useNewUrlParser: true, // Allows connection URL to be passed as string
    useUnifiedTopology: true,
    maxPoolSize: 30,
    dbName: process.env.DB_NAME //giving the dbname here which is picked from the env variables of respective provider's MS deployment.yaml
};

const conn = mongoose.createConnection(process.env.MONGOOSE_URL, options);
conn.on("connected", () => {
    logger.debug("LOG", "Connected to Mongo DB", conn.name)
})
module.exports = conn;