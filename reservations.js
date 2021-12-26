const Reservations = require('../models/reservation.model');
const User = require('../models/user.model');
const Flight = require('../models/flight.model');
const router = require('express').Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: "aclproject2021Sallam@outlook.com",
    pass: "Mostafasallam"
  }
});

router.route('/showAllreservedFlights').get((req, res) => {
  Reservations.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/reservedFlights/:passportNumber').get((req, res) => {
  passportNum=req.params.passportNumber
  
  Reservations.find({passportNumber:passportNum})
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/sendItenary/:passportNumber').post(async(req, res) =>{
  const reservations=await Reservations.find({'passportNumber':req.params.passportNumber})
  const user=await User.find({'passportNumber':req.params.passportNumber})
    // console.log(user)
    let flightNumbers=[]
    for (var i=0;i<reservations.length;i++){
      flightNumbers[i]=reservations[i].flightNumber
    }
    console.log(flightNumbers)
    email=user[0].email
    let myFlights= await Flight.find()
    let contentsOfMail="Dear," + user[0].firstName + " " + user[0].lastName + ",\n" +
    " This is a mail containing your Itinerary:"
    console.log()
    for (var i=0;i<reservations.length;i++){
      let myFlight=myFlights[i]
      let tempReservation=reservations[i]
      let flightNumberTemp=reservations[i].flightNumber
      myFlight=myFlights[flightNumbers.indexOf(flightNumberTemp)]
      if(flightNumbers.includes(myFlight.flightNumber)){

          let tempReservation=reservations[i]
          let flightNumberTemp=reservations[i].flightNumber
        

          contentsOfMail+= 
            "\n       Flight Number: " + flightNumberTemp +
            "\n       From: " + myFlight.from +
            "\n       To: " + myFlight.to +
            "\n       Cabin: " +tempReservation.cabin +
            "\n       Departure Date: " + myFlight.departureDate + " " + myFlight.departureTime +
            "\n       Arrival Date: " + myFlight.arrivalDate + " " + myFlight.arrivalTime +
            "\n       Departure Terminal: " + myFlight.departureTerminal +
            "\n       Arrival Terminal: " + myFlight.arrivalTerminal +
            "\n       Reserved Adults Seats: " + tempReservation.adultsSeatsReserved +
            "\n       Reserved Children Seats: " + tempReservation.childrenSeatsReserved +"\n"
        }
  }
  console.log(contentsOfMail)
  const options = {

    from: "aclproject2021Sallam@outlook.com",
    to: email,
    subject: "Itenary Confirmation",
    text:contentsOfMail
  }
  
      
    transporter.sendMail(options, function (err, info) {
        res.json("Email Sent")
    });
  })

module.exports = router;