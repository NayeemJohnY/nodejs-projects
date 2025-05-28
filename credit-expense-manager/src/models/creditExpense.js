const mongoose = require('mongoose');

const creditExpenseSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        required: true,
        enum: ["CREDIT", "EXPENSE"]
    },

    description: {
        type: String,
        trim: true,
        required: true,
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

const creditExpense = mongoose.model('CreditExpense', creditExpenseSchema)
module.exports = creditExpense