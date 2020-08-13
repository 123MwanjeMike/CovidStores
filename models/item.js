const mongoose = require('mongoose');

//Creating schema for registerAgent
const itemSchema = new mongoose.Schema({    
    photo: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    make: {
        type: String,
        trim: true,
    },
    serialNo: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    DOE: {
        type: String,
        trim: true,
    },
    numberInStock: {
        type: Number,
        trim: true,
    },
    price: {
        type: Number,
        trim: true,
    },
    initialPay: {
        type: Number,
        trim: true,
    },
    payInterval: {
        type: Number,
        trim: true,
    },
});

module.exports = mongoose.model('LTPP', itemSchema);