const router = require('express').Router();
const User = require('../models/user.model');
const Flight = require('../models/flight.model');
const Reservation = require('../models/reservation.model');
const flightRouter = require('./flights')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({

  service: "hotmail",

  auth: {
    user: "sallawlawlaw@hotmail.com",
    pass: "mostafasallam1"
  }

});

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/findUserIsAdmin/:isAdmin', (req, res) => {
  User.find({ isAdmin: req.params.isAdmin }).then(user => res.json(user));
});

router.get('/findUserName/:name', (req, res) => {
  User.find({ name: req.params.name }).then(user => res.json(user));
});

router.get('/findUserEmail/:email', (req, res) => {
  User.find({ email: req.params.email }).then(user => res.json(user));
});

router.get('/findUserAge/:age', (req, res) => {
  User.find({ age: req.params.age }).then(user => res.json(user));
});

router.get('/findUserBirthPlace/:birthPlace', (req, res) => {
  User.find({ birthPlace: req.params.birthPlace }).then(user => res.json(user));
});

router.get('/findUserPhoneNumber/:phoneNumber', (req, res) => {
  User.find({ phoneNumber: req.params.phoneNumber }).then(user => res.json(user));
});

User.isAdmin = true;

router.route('/addUser').post((req, res) => {


  if (User.isAdmin) {
    const isAdmin = Boolean(req.body.isAdmin);
    const name = req.body.name;
    const email = req.body.email;
    const age = Number(req.body.age);
    const birthPlace = req.body.birthPlace;
    const phoneNumber = req.body.phoneNumber;


    const newUser = new User({

      isAdmin,
      name,
      email,
      age,
      birthPlace,
      phoneNumber,
    });

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));

  }
  else {
    res.send("You are not an admin");
  }
});

router.route('/login').post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ 'email': email })
  console.log(user.password)
  if (password == user.password && email == user.email) {
    res.send(user)
  } else {
    res.send("Not matching")

  }




})

router.route('/updateUser/:id').post((req, res) => {

  if (User.isAdmin) {
    User.findById(req.params.id)
      .then(user => {

        user.isAdmin = Boolean(req.body.isAdmin);
        user.name = req.body.name;
        user.age = Number(req.body.age);
        user.birthPlace = req.body.birthPlace;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;

        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else {
    res.send("You are not an admin!");
  }

});

router.route('/deleteUser/:id').delete((req, res) => {
  if (User.isAdmin) {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else {
    res.send("You are not an admin!");
  }

});



router.route('/addFlight').post((req, res) => {
  Flight.countDocuments()
    .then((count_documents) => {

      console.log(count_documents);
      if (User.isAdmin) {
        const flightNumber = count_documents + 1
        const from = req.body.from;
        const to = req.body.to;
        const arrivalDate = Date.parse(req.body.arrivalDate);
        const arrivalTerminal = req.body.arrivalTerminal;
        const arrivalTime = req.body.arrivalTime;
        const departureDate = Date.parse(req.body.departureDate);
        const departureTerminal = req.body.departureTerminal;
        const departureTime = req.body.departureTime;
        const childrenPassengerSeats = req.body.childrenPassengerSeats;
        const adultPassengersSeats = req.body.adultPassengersSeats;
        const cabin = req.body.cabin;
        const eSeatsAvailable = Number(req.body.eSeatsAvailable);
        const bSeatsAvailable = Number(req.body.bSeatsAvailable);
        const tripDuration = req.body.tripDuration;
        const baggageAllowance = req.body.baggageAllowance;
        const ePrice = req.body.ePrice;
        const bPrice = req.body.bPrice;


        const newFlight = new Flight({
          flightNumber,
          from,
          to,
          arrivalDate,
          arrivalTerminal,
          arrivalTime,
          departureDate,
          departureTerminal,
          departureTime,
          childrenPassengerSeats,
          adultPassengersSeats,
          cabin,
          eSeatsAvailable,
          bSeatsAvailable,
          tripDuration,
          baggageAllowance,
          ePrice,
          bPrice,


        });


        if (req.body.terminal < 0 || req.body.from == req.body.to || req.body.seatNumber < 0 || req.body.arrivalTime <= req.body.departureTime) {
          console.log(req.body.arrivalTime <= req.body.departureTime)
          res.json('Entries are not acceptable')
        }

        else {

          newFlight.save()
            .then(() => res.json('Flight added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }

      }
      else {
        res.send("You are not an admin!");
      }

    })
});



// router.route('/updateFlight/:id').post((req, res) => {

//   if (User.isAdmin) {
//     Flight.findById(req.params.id)
//       .then(flight => {

//         flight.flightNumber = req.body.flightNumber;
//         flight.departureDate = req.body.departureDate;
//         flight.departureTime = req.body.departureTime;
//         flight.departureTerminal = req.body.departureTerminal;
//         flight.arrivalDate = req.body.arrivalDate;
//         flight.arrivalTime = req.body.arrivalTime;
//         flight.arrivalTerminal = req.body.arrivalTerminal;
//         flight.eSeatsAvailable = req.body.eSeatsAvailable;
//         flight.bSeatsAvailable = req.body.bSeatsAvailable;

//         flight.save()
//           .then(() => res.json('Flight updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   }
//   else {
//     res.send("You are not an admin!");
//   }

// });



router.route('/deleteFlight/:id').delete((req, res) => {


  // if (User.isAdmin) {


  Flight.findOneAndDelete(req.params.id)
    .then(() => res.json("Flight deleted."))
    .catch(err => res.status(400).json('Error: ' + err));

  // }
  // else {
  //   res.send("You are not an admin!");
  // }
});

// router.route('/reserve/:id').put((req,res) => {
//   if (User.isAdmin) {
//     Flight.findById(req.params.id)
//       .then(flight => {

//         flight.reservedUsers = req.body.name;
//         flight.save()
//           .then(() => res.json('Flight updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   }
//   else {
//     res.send("You are not an admin!");
//   }

// });


router.put('updateFlight/:id', async (req, res) => {
  if (User.isAdmin) {
    try {

      Flight.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, model) => {
        if (!err) {
          return res.json({ data: model })
        } else {
          return res.data({ error: `Flight not found` })
        }
      })
    }
    catch (e) {
      return res.data({ error: `Request Error` })

    }
  }
})




router.route('/reserve/').put(async (req, res) => {
  const userNumber = req.body.userNumber
  const flightNumber = req.body.flightNumber
  const cabin = req.body.cabin
  const seatsReserved = req.body.seatsReserved
  const user = await User.findOne({ 'userNumber': userNumber })
  const userEmail = user.email
  var reservations = await Reservation.find()
  var max = 0;
  if (reservations.length != 0) {
    for (var i = 0; i < reservations.length - 1; i++) {
      if (reservations[i].bookingNumber >= reservations[i + 1].bookingNumber) {
        max = reservations[i].bookingNumber
      }
      else {
        max = reservations[i + 1].bookingNumber
      }
    }
    max++
  }
  const bookingNumber = max



  const newReservation = new Reservation({
    bookingNumber,
    userNumber,
    flightNumber,
    seatsReserved

  })

  //update reservedUsers and flightsreserved fields
  const myFlight = await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
    $push: {
      reservedUsers: userNumber
    }
  })
  const myUser = await User.findOneAndUpdate({ 'userNumber': userNumber }, {
    $push: {
      flightsreserved: flightNumber
    }
  })
  //decrement remaining seats
  let newSeats = 0
  if (cabin == "Economy" || cabin == "economy") {

    if (myFlight.eSeatsAvailable >= seatsReserved) {
      newSeats = myFlight.eSeatsAvailable - seatsReserved
      await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        eSeatsAvailable: newSeats
      })
    }

    else {
      res.send("Not enough remaining seats.")
    }
  }

  else if (cabin === "Business" || cabin == "buisness") {
    if (myFlight.eSeatsAvailable >= seatsReserved) {
      newSeats = myFlight.bSeatsAvailable - seatsReserved
      await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        bSeatsAvailable: newSeats
      })
    } else {
      res.send("Not enough remaining seats.")


    }
  }
  //confirmation mail

  const options = {

    from: "sallawlawlaw@hotmail.com",
    to: userEmail,
    subject: "Reservation Confirmation",
    text:
      "Dear," + user.firstName + " " + user.lastName + ",\n" +
      "\n This is a confirmation mail that you have reserved this flight:" +
      "                                                                 \n" +
      "\n      From: " + myFlight.from +
      "\n      To: " + myFlight.to +
      "\n      Cabin: " + cabin +
      "\n      Departure: " + myFlight.departureDate + " " + myFlight.departureTime +
      "\n      Arrival: " + myFlight.arrivalDate + " " + myFlight.arrivalTime +
      "\n      Departure Terminal: " + myFlight.departureTerminal +
      "\n      Arrival Terminal: " + myFlight.arrivalTerminal
  }
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err)
      return
    }
    console.log("Sent: " + info)
  });

  await newReservation.save()
    .then(() => {
      res.json('reserved!')
      // console.log(myFlight)
      //  myFlight.reservedUsers=myFlight.reservedUsers.push(userNumber) 

      //  // 3ashan yzwd el users el 3amalo reserve fel flight di 
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

)

router.route('/cancel/').put(async (req, res) => {
  const bookingNumber = req.body.bookingNumber
  const reservation = await Reservation.findOne({ 'bookingNumber': bookingNumber })
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

}

)




// router.route('/updateFlight').put((req, res) => {


//   if (User.isAdmin) {

//     const flightNumber = req.body.flightNumberOld;
//     const departureDateOld = req.body.departureDateOld;
//     const departureTimeOld = req.body.departureTimeOld;
//     const departureTerminalOld = req.body.departureTerminalOld;
//     const arrivalDateOld = req.body.arrivalDateOld;
//     const arrivalTimeOld = req.body.arrivalTimeOld;
//     const arrivalTerminalOld = req.body.arrivalTerminalOld;
//     const eSeatsAvailableOld = req.body.eSeatsAvailableOld;
//     const bSeatsAvailableOld = req.body.bSeatsAvailableOld;





//     const flightNumber = req.body.flightNumber;
//     const departureDate = req.body.departureDate;
//     const departureTime = req.body.departureTime;
//     const departureTerminal = req.body.departureTerminal;
//     const arrivalDate = req.body.arrivalDate;
//     const arrivalTime = req.body.arrivalTime;
//     const arrivalTerminal = req.body.arrivalTerminal;
//     const eSeatsAvailable = req.body.eSeatsAvailable;
//     const bSeatsAvailable = req.body.bSeatsAvailable;


//     Flight.findOneAndUpdate({
//       'flightNumber': flightNumberOld,'arrivalTime': arrivalTimeOld, 'arrivalDate': arrivalDateOld, 'arrivalTerminal': arrivalTerminalOld, 'arrivalTime': arrivalTimeOld, 'departureTime': departureTimeOld, 'departureDate': departureDateOld,
//       'departureTerminal': departureTerminalOld, 'eSeatsAvailable': eSeatsAvailableOld, 'bSeatsAvailable': bSeatsAvailableOld,
//     }
//       ,
//       {
//         'flightNumber': flightNumber,'arrivalTime': arrivalTime, 'arrivalDate': arrivalDate, 'arrivalTerminal': arrivalTerminal, 'arrivalTime': arrivalTime, 'departureTime': departureTime, 'departureDate': departureDate,
//         'departureTerminal': departureTerminal, 'eSeatsAvailable': eSeatsAvailable, 'bSeatsAvailable': bSeatsAvailable,
//       })


//     Flight.updateOne
//       .then(flights => res.json("Flight updated!"))
//       .catch(err => res.status(400).json('Error: ' + err));




//   }
//   else {
//     res.send("You are not an admin");
//   }
// });



module.exports = router;
