const mongoose = require('mongoose');
const validator = require('validator');
const connection = require('../db/mongooseClient')

const subscriptionSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    place: {
        type: String,
        trim: true
    },

    phone: {
        type: String,
        // using validator library
        validate(value) {
            if (value !== "" && !validator.isMobilePhone(value, ['en-IN'])) {
                throw new Error("Mobile Number is not Valid")
            }
        }
    },
    amount: {
        type: Number,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true,
})

const Subscription = connection.model('Subscription', subscriptionSchema)
module.exports = Subscription