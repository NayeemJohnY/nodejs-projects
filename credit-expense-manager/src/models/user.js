const mongoose = require('mongoose');
const validator = require("validator")
const jwt = require('jsonwebtoken')
const {logger} = require("../utils/logger")
const connection = require('../db/mongooseClient')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: function(value) {
            return value.charAt(0).toUpperCase() + value.substring(1);
        }
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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password should not contain a 'password'")
            }
        }

    },
    token: {
        type: String
    },
    role: {
        type: String
    }

}, {
    timestamps: true
})

// virtual propety linking models
userSchema.virtual('subscriptions', {
    ref: 'Subscription',
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.toJSON = function() {return (({ name, email }) => ({ name, email }))(this)}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    payload = { _id: user._id.toString(), email: user.email.toString()}
    if(user.role && user.role === 'admin'){
        payload.role =user.role.toString()
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
    user.token = token
    return token
}

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    user.token = await user.generateAuthToken()
    user.updatedAt = new Date()
    next()
})

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) {
        throw new Error("User unable to login")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("User unable to login")
    }
    return user
}


const User = connection.model('User', userSchema)
module.exports = User