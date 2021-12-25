const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  isAdmin: {
    type: Boolean,
    required: false,
  },
  // userNumber: {
  //   type: Number,
  //   required: true,
  // },
  password:{
    type: String,
    requried:true
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },  

  flightsreserved:[{
    type:Number,
    required :false
  }],
  passportNumber: {
    type: Number,
    required: true
  },  
  

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;