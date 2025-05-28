const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_URL, {}).then(response => {
    console.log("Connected to MongoDB:", response);
}).catch(error => {
    console.log("Error while connecting to MongoDB:", error);
})