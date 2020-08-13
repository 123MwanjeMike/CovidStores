const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//Creating schema for registerAgent
const userSchema = new mongoose.Schema({
    NIN: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    empid: {
        type: String,
        trim: true,
        required: true,
        unique: true,
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

userSchema.plugin(passportLocalMongoose, { usernameField: 'empid' })
module.exports = mongoose.model('users', userSchema);