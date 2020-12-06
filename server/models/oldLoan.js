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
    borrower: Joi.any().required(),
    lender: Joi.string().required(),
    loanValue: Joi.number().min(1).required()
})

exports.loanSchema = mongoose.model('Loan', loanSchema);
exports.joiGiveLoan = joiGiveLoan;