const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({

  flightNumber: {
    type: Number,
    unique:true,
    required: true,

  },

  from: {
    type: String,
    required: true,
    
  },
  
  to: {
    type: String,
    required: true,
    
  },



  departureDate: {
    type: String,
    required: true,
    
  },
  
  departureTime:{
    type: String,
    required: true,
  },
  
 
  departureTerminal: {
    type: Number,
  
  },
   arrivalDate: {
    type: String,
    required: true,
    
  },

  arrivalTime:{
    type: String,
    required:true
  
  },

  arrivalTerminal: {
    type: Number,
    required: true,
  },

  eSeatsAvailable: {
    type: Number,
    required: true,
  },

  bSeatsAvailable: {
    type: Number,
    required: true,
  },
  cabin: {
    type: String,
    required: true,
  },
  reservedUsers:[{
    type:Number,
    required :true
    }],
  bSeatsPrice :{
      type:Number,
      required:true
  },
  eSeatsPrice:{
      type:Number,
      required:true
    }

  


}, { timestamps: true });




const Flight = mongoose.model('Flights', flightSchema);
module.exports = Flight;
