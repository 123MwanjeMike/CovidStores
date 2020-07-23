const mongoose = require('mongoose');

//Creating schema for registerAgent
const registerAgentSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  dob: {
    type: Date,
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

module.exports = mongoose.model('registerAgent', registerAgentSchema);