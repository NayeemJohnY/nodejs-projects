// Validation schema
// ODM - Object Document Mapper
const mongoose = require('mongoose');
url = process.env.MONGOOSEURL

mongoose.connect(url, {})

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },

//     age: {
//         type: Number
//     }
// })

// const user_1 = new User({
//     name: "Awe",
//     age: "hhh"
// })

// user_1.save().then(() => {
//     console.log(user_1);
// }).catch((err) => {
//     console.log("Error: ", err);
// })


// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }

// })

// const task_1 = new Task({
//     description: "Reading the books",
//     completed: true
// })

// task_1.save().then(() => {
//     console.log(task_1);
// }).catch((err) => {
//     console.log("Error: ", err);
// })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true
//     },

//     age: {
//         type: Number,
//         // custom validator for age
//         validate(value) {
//             if (value < 0) {
//                 throw new Error("Age must be greater than zero")
//             }
//         }

//     }
// })

// const user_1 = new User({
//     name: "JohnAwe",
//     age: -1
// })

// user_1.save().then(() => {
//     console.log(user_1);
// }).catch((err) => {
//     console.log("Error: ", err);
// })

// const validator = require("validator")


// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         // using validator library
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Email is not valid")
//             }
//         }
//     },

//     age: {
//         type: Number,
//         default: 0,
//         // custom validator for age
//         validate(value) {
//             if (value < 0) {
//                 throw new Error("Age must be greater than zero")
//             }
//         }

//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes("password")) {
//                 throw new Error("Password does not contain a 'password'")
//             }
//         }

//     }
// })

// const user_1 = new User({
//     name: "  passwordset  ",
//     email: "  MYemail@ggmi.com ",
//     password: "  pass@12345  "
// })

// user_1.save().then(() => {
//     console.log(user_1);
// }).catch((err) => {
//     console.log("Error: ", err);
// })


// schema types
// default value, lowercase, uppercase, trim, match


// customize task model


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }

})

const task_1 = new Task({

})



task_1.save().then(() => {
    console.log(task_1);
}).catch((err) => {
    console.log("Error: ", err);
})