const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
 bookingNumber:{
   type:Number,
   required:true
 },
  userNumber: {

    type: Number,
    required: true

    } ,
    
    flightNumber: {

        type: Number,
        required: true

    } , 

    seatsReserved: {
        type: Number,
        required: true
    }


  });


const reservation = mongoose.model('reservation', reservationSchema);
module.exports = reservation
