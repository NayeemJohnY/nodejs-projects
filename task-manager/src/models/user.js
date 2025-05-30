const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            // using validator library
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is not valid")
                }
            }
        },

        age: {
            type: Number,
            default: 0,
            // custom validator for age
            validate(value) {
                if (value < 0) {
                    throw new Error("Age must be greater than zero")
                }
            }

        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error("Password should not contain a 'password'")
                }
            }

        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],

        avatar: {
            type: Buffer
        }

    }, {
        timestamps: true
    })
    // virtual propety linking models
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: 600 })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// userSchema.methods.getPublicProfile = function() {
//     const user = this
//     const userObject = user.toObject()
//     delete userObject.password
//     delete userObject.tokens
//     return userObject
// }
// Auto configured without method
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
        // delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User unable to login")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("User unable to login")
    }
    return user
}


// hash plain text password before save
userSchema.pre('save', async function(next) {
        const user = this
        if (user.isModified("password")) {
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
    })
    // Delete task of deleted user
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id });
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User