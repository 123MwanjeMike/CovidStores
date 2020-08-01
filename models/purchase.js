const mongoose = require('mongoose');

//Creating schema for registerAgent
const transactionSchema = new mongoose.Schema({    
    fname: {
        type: String,
        trim: true,
    },
    lname: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    tel: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    NIN: {
        type: String,
        trim: true,
    },
    ref: {
        type: String,
        trim: true,
    },
    itemName: {
        type: String,
        trim: true,
    },
    serialNo: {
        type: String,
        trim: true,
    },
    payment: {
        type: Array,
    },
    DOP: {
        type: Array,
    },
    nextPay: {
        type: String,
        trim: true,
    },
    nDOP: {
        type: String,
        trim: true,
    },
    receipt: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('transaction', transactionSchema);