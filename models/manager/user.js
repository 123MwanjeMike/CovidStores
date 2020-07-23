const mongoose = require('mongoose');

//Creating schema for registerAgent
const userSchema = new mongoose.Schema({
    NIN: {
        type: String,
        trim: true,
    },
    empid: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    },
    fname: {
        type: String,
        trim: true,
    },
    lname: {
        type: String,
        trim: true,
    },
    dob: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    agentPhoto: {
        type: String,
        trim: true,
    },
    NIN: {
        type: String,
        trim: true,
    },
    telephone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('user', userSchema);