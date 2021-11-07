const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true
  },
  cabin: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  flightDate: {
    type: String,
    required: true,
  },
  arrivalTime:{
    type:String,
    required: true
  },
  departureTime:{
    type:String,
    required:true
  
  },
  terminal:{
    type:Number,
   required:true 
  }

});




const Flight = mongoose.model('Flights', flightSchema);
module.exports = Flight;
