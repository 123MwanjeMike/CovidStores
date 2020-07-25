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
        type: String,
        trim: true,
    },
    price: {
        type: String,
        trim: true,
    },
    initialPay: {
        type: String,
        trim: true,
    },
    payInterval: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('LTPP', itemSchema);