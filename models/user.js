const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//Creating schema for registerAgent
const userSchema = new mongoose.Schema({
    NIN: {
        type: String,
        trim: true,
        required: true,
    },
    empid: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        trim: true,
    },
    fname: {
        type: String,
        trim: true,
        required: true,
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
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', userSchema);