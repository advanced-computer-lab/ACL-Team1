const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  bookingNumber: {
    type: Number,
    required: true
  },
  passportNumber: {

    type: Number,
    required: true

  },

  flightNumber: {

    type: Number,
    required: true

  },

  childrenSeatsReserved: {
    type: Number,
    required: true
  },

  adultsSeatsReserved: {
    type: Number,
    required: true
  },

  cabin: {
    type: String,
    required: true
  }



});


const reservation = mongoose.model('reservation', reservationSchema);
module.exports = reservation