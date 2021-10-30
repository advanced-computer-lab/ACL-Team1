const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true,
  },

  BornIn: {
    type: String,
    required: true
  },

  PhoneNumber: {
    type: String,
    required: true
  },
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
module.exports = user;
