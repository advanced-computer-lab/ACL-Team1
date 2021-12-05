const Reservations = require('../models/reservation.model');
const User = require('../models/user.model');
const Flight = require('../models/flight.model');
const router = require('express').Router();
module.exports = router;
router.route('/reservedFlights').get((req, res) => {
  Reservations.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/reservedFlights/:id').get((req, res) => {
  Reservations.findById(req.params.id)
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/cancelReservation/').delete(async (req, res) => {
  
  const bookingNumber = req.body.bookingNumber
  const reservation = await Reservation.findOne(bookingNumber)
  const userNumber = reservation.userNumber
  const flightNumber = reservation.flightNumber
  const flight = await Flight.findOne({ 'flightNumber': flightNumber })
  const cabin = flight.cabin
  const seatsReserved = reservation.seatsReserved
  const user = await User.findOne({ 'userNumber': userNumber })
  const userEmail = user.email
  var refundedPrice = 0;



  const myFlight = await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
    $pull: {
      reservedUsers: userNumber
    }
  })
  console.log(myFlight.reservedUsers + "dsdsds")

  const myUser = await User.findOneAndUpdate({ 'userNumber': userNumber }, {
    $pull: {
      flightsreserved: flightNumber
    }
  })
  let newSeats = 0
  if (cabin == "Economy" || cabin == "economy") {
    newSeats = myFlight.eSeatsAvailable + seatsReserved
    await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
      eSeatsAvailable: newSeats
    })
    refundedPrice = 0.9 * myFlight.eSeatsPrice


  }

  else if (cabin === "Business" || cabin == "buisness") {
    newSeats = myFlight.bSeatsAvailable + seatsReserved
    await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
      bSeatsAvailable: newSeats
    })
    refundedPrice = 0.9 * myFlight.bSeatsPrice
    console.log(refundedPrice)


  }


  const options = {

    from: "sallawlawlaw@hotmail.com",
    to: userEmail,
    subject: "Cancelation Confirmation",
    text:
      "Dear," + user.firstName + " " + user.lastName + ",\n" +
      " This is a confirmation mail that you have canceled this flight:" +
      "                                                                      \n" +
      "\n      From: " + myFlight.from +
      "\n      To: " + myFlight.to +
      "\n      Cabin: " + cabin +
      "\n      Departure: " + myFlight.departureDate + " " + myFlight.departureTime +
      "\n      Arrival: " + myFlight.arrivalDate + " " + myFlight.arrivalTime +
      "\n      Departure Terminal: " + myFlight.departureTerminal +
      "\n      Arrival Terminal: " + myFlight.arrivalTerminal +
      "\n      Refunded Amount is: " + refundedPrice
  }
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err)
      return
    }
    console.log("Sent: " + info)
  });
  await Reservation.findOneAndDelete({ 'bookingNumber': bookingNumber })
    .then(() => { res.json('canceled!') })
    .catch(err => res.status(400).json('Error: ' + err));

  // Reservations.findByIdAndDelete(req.params.id)
  //   .then(() => res.json('Reservation canceled'))
  //   .catch((err) => console.log(err))


  //    const bookingNumber=req.body.bookingNumber
  //    const reservation=await Reservations.findOne({'bookingNumber':bookingNumber})
  //    const userNumber=reservation.userNumber
  //    const flightNumber=reservation.flightNumber
  //    const flight=await Flight.findOne({'flightNumber':flightNumber})
  //    const cabin= flight.cabin
  //    const seatsReserved=reservation.seatsReserved
  //    const user=await User.findOne({'userNumber':userNumber})
  //    const userEmail=user.email
  //    var refundedPrice=0;



  //    const myFlight= await Flight.findOneAndUpdate({'flightNumber':flightNumber},{
  //      $pull:{
  //        reservedUsers:userNumber
  //      }
  //    })
  //    console.log(myFlight.reservedUsers+"dsdsds")

  //    const myUser= await User.findOneAndUpdate({'userNumber':userNumber},{
  //      $pull:{
  //        flightsreserved:flightNumber
  //      }
  //    })
  //    let newSeats=0
  //    if(cabin=="Economy" || cabin=="economy"){
  //      newSeats=myFlight.eSeatsAvailable+seatsReserved
  //      await Flight.findOneAndUpdate({'flightNumber':flightNumber},{
  //        eSeatsAvailable:newSeats
  //      })
  //      refundedPrice=0.9*myFlight.eSeatsPrice


  //    }

  //    else if(cabin==="Business" || cabin=="buisness"){
  //      newSeats=myFlight.bSeatsAvailable+seatsReserved
  //      await Flight.findOneAndUpdate({'flightNumber':flightNumber},{
  //        bSeatsAvailable:newSeats
  //      })
  //      refundedPrice=0.9*myFlight.bSeatsPrice
  //      console.log(refundedPrice)


  //    }


  //    const options={

  //      from:"sallawlawlaw@hotmail.com",
  //      to:userEmail,
  //      subject:"Cancelation Confirmation",
  //      text:
  //      "Dear,"+user.firstName+" "+user.lastName+",\n"+
  //      " This is a confirmation mail that you have canceled this flight:"+
  //     "                                                                      \n"+
  //      "\n      From: "+myFlight.from+
  //      "\n      To: "+myFlight.to+
  //      "\n      Cabin: "+cabin+
  //      "\n      Departure: "+myFlight.departureDate+" "+myFlight.departureTime+
  //      "\n      Arrival: "+myFlight.arrivalDate+ " "+myFlight.arrivalTime+
  //      "\n      Departure Terminal: "+ myFlight.departureTerminal+
  //      "\n      Arrival Terminal: "+myFlight.arrivalTerminal+
  //      "\n      Refunded Amount is: "+refundedPrice
  //  }
  //  transporter.sendMail(options,function(err,info){
  //      if(err){
  //          console.log(err)
  //          return
  //      }
  //     console.log("Sent: "+info)
  //  });
  //  await Reservations.findOneAndDelete({'bookingNumber':bookingNumber})
  //  .then(() =>{ res.json('canceled!')})
  //  .catch(err => res.status(400).json('Error: ' + err));  

}

)