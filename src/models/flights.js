const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true
  },
  Cabin: {
    type: String,
    required: true,
  },
  SeatsNumber: {
    type: Number,
    required: true,
  },
  FlightDate: {
    type: Date,
    required: true,
  }

});




const flight = mongoose.model('flights', flightSchema);
module.exports = flight;
