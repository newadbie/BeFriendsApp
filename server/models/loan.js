const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'Borrower'
    },
    lender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    loanValue: {
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
    loanValue: Joi.number().min(1).required()
})

exports.loanSchema = mongoose.model('Loan', loanSchema);
exports.joiGiveLoan = joiGiveLoan;