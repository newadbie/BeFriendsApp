const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    }
})

exports.borrowerSchema = mongoose.model('Borrower', borrowerSchema);