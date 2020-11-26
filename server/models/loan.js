const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
    borrower: {
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true,
        }
    },
    lender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    lendValue: {
        type: Number,
        required: true,
    }
});

const joiGiveLoan = Joi.object().keys({
    borrower: Joi.object().keys({
        name: Joi.string().trim().required(),
        phoneNumber: Joi.string().min(8).max(9).required()
    }),
    lender: Joi.string().required(),
    lendValue: Joi.number().min(1).required()
})

exports.loanSchema = mongoose.model('Loan', loanSchema);
exports.joiGiveLoan = joiGiveLoan;