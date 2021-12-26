const router = require('express').Router();
const User = require('../models/user.model');
const Flight = require('../models/flight.model');
const Reservation = require('../models/reservation.model');
const flightRouter = require('./flights')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: "aclproject2021Sallam@outlook.com",
    pass: "Mostafasallam"
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



router.get('/findUser/:passportNumber', (req, res) => {

  User.find({ passportNumber: req.params.passportNumber }).then(user => res.json(user));
});



router.route('/login').post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ 'email': email })
  console.log(user.password)
  if ( email == user.email) {

    bcrypt.compare(req.body.password, user.password)
          .then(isCorrect => {
            res.send(user)
            console.log("Login successful!")
          })
    
  } else {
    res.send("Not matching!")

  }




})


router.route('/deleteUser/:id').delete((req, res) => {
  
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));


});



router.route('/addFlight').post((req, res) => {


      
        const flightNumber = Number(req.body.flightNumber);
        const from = req.body.from;
        const to = req.body.to;
        const arrivalDate = req.body.arrivalDate;
        const arrivalAirport = req.body.arrivalAirport;
        const arrivalTime = req.body.arrivalTime;
        const departureDate = req.body.departureDate;
        const departureTime = req.body.departureTime;
        const departureAirport = req.body.departureAirport;
        const departureTerminal = req.body.departureTerminal;
        const arrivalTerminal = req.body.arrivalTerminal;
        const eSeatsAvailable = Number(req.body.eSeatsAvailable);
        const bSeatsAvailable = Number(req.body.bSeatsAvailable);
        const eSeatsPrice = req.body.eSeatsPrice;
        const bSeatsPrice = req.body.bSeatsPrice;
        const tripDuration = req.body.tripDuration;
        const baggageAllowance = req.body.baggageAllowance;


        const newFlight = new Flight({
          flightNumber,
          from,
          to,
          departureDate,
          departureAirport,
          departureTime,
          arrivalDate,
          arrivalAirport,
          arrivalTime,
          departureTerminal,
          arrivalTerminal,
          eSeatsAvailable,
          bSeatsAvailable,
          eSeatsPrice,
          bSeatsPrice,
          tripDuration,
          baggageAllowance,

        });


          newFlight.save()
            .then(() => res.json('Flight added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        



    })




router.route('/deleteFlight/').delete(async (req, res) => {

  
  const flightNumber = req.body.flightNumber;
  const flight = await Flight.findOne({ 'flightNumber': flightNumber })

  await Flight.findOneAndDelete({ 'flightNumber': flightNumber })
    .then(() => { res.json('Flight deleted!') })
    .catch(err => res.status(400).json('Error: ' + err));


});




router.put('/updateFlight/:flightNumber', async (req, res) => {
  
  flightNum = req.params.flightNumber
  //console.log(flightNum)
  

    try {

      Flight.findOneAndUpdate({'flightNumber': flightNum}, req.body, { new: true }, (err, model) => {
        if (!err) {
          return res.json({ data: model })
        } else {
          return res.send({ error: `Flight not found` })
        }
      })
    }
    catch (e) {
      return res.send({ error: `Request Error` })

    }
  
})




router.route('/reserve/').put(async (req, res) => {
  const passportNumber = req.body.passportNumber
  const flightNumber = req.body.flightNumber
  const cabin = req.body.cabin
  const childrenSeatsReserved = req.body.childrenSeatsReserved
  const adultsSeatsReserved = req.body.adultsSeatsReserved
  const user = await User.findOne({ 'passportNumber': passportNumber })
  const userEmail = user.email
  var reservations = await Reservation.find()
  var totalPrice = 0;
  var max = 1;
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
    passportNumber,
    flightNumber,
    childrenSeatsReserved,
    adultsSeatsReserved,
    cabin

  })

  //update reservedUsers and flightsreserved fields
  const myFlight = await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
    $push: {
      reservedUsers: passportNumber
    }
  })
  const myUser = await User.findOneAndUpdate({ 'passportNumber': passportNumber }, {
    $push: {
      flightsreserved: flightNumber
    }
  })
  //decrement remaining seats
  let newSeats = 0
  if (cabin == "Economy" || cabin == "economy") {

    if (myFlight.eSeatsAvailable >= (childrenSeatsReserved + adultsSeatsReserved)) {
      newSeats = myFlight.eSeatsAvailable - childrenSeatsReserved - adultsSeatsReserved
      await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        eSeatsAvailable: newSeats
      })
      totalPrice = (myFlight.eSeatsPrice * adultsSeatsReserved) + (myFlight.eSeatsPrice * childrenSeatsReserved * 0.5)
    }

    else {
      res.send("Not enough remaining seats.")
    }
  }

  else if (cabin === "Business" || cabin == "business") {
    if (myFlight.eSeatsAvailable >= (childrenSeatsReserved + adultsSeatsReserved)) {
      newSeats = myFlight.bSeatsAvailable - childrenSeatsReserved - adultsSeatsReserved
      await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        bSeatsAvailable: newSeats
      })
      totalPrice = (myFlight.bSeatsPrice * adultsSeatsReserved) + (myFlight.bSeatsPrice * childrenSeatsReserved * 0.5)
    } else {
      res.send("Not enough remaining seats.")


    }
  }
  //confirmation mail

  const options = {

    from: "aclproject2021Sallam@outlook.com",
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
      "\n      Arrival Terminal: " + myFlight.arrivalTerminal +
      "\n      Total Price: " + totalPrice
      
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
      //  myFlight.reservedUsers=myFlight.reservedUsers.push(id) 

      //  // 3ashan yzwd el users el 3amalo reserve fel flight di 
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

)

router.put('/updateReservation/:bookingNumber', async (req, res) => {
  
  
    
    try {
      Reservation.findOneAndUpdate(req.params.bookingNumber, req.body, { new: true }, (err, model) => {   
        
        if (!err) {
          return res.json({ data: model })
        
        } 
        
        else {
          return res.data({ error: `Reservation not found` })
        }
      })
    }
    catch (e) {
      return res.data({ error: `Request Error` })

    }

    //req.body el user mdakhalha

    const bookingNumber = req.body.bookingNumber
    const reservation = await Reservation.findOne({ 'bookingNumber': bookingNumber })
    const passportNumber = reservation.passportNumber
    const flightNumber = reservation.flightNumber
    const flight = await Flight.findOne({ 'flightNumber': flightNumber })
    const oldCabin = reservation.cabin
    const childrenSeatsReserved = reservation.childrenSeatsReserved
    const adultsSeatsReserved = reservation.adultsSeatsReserved
    const user = await User.findOne({ 'passportNumber': passportNumber })
    const userEmail = user.email
    const newCabin = req.body.cabin
    var refundedPrice = 0;
    var debitedPrice = 0;
    var catcher = 0;



    const myFlight = await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
      $pull: {
        reservedUsers: passportNumber
      }
    })
    console.log(myFlight.reservedUsers)
  
    const myUser = await User.findOneAndUpdate({ 'passportNumber': passportNumber }, {
      $pull: {
        flightsreserved: flightNumber
      }
    })
    let newESeats = 0
    let newBSeats = 0
    
    
   // refundedPrice = 0.9 * ((myFlight.eSeatsPrice * adultsSeatsReserved) + (myFlight.eSeatsPrice * childrenSeatsReserved * 0.5))
   


    if(oldCabin != newCabin){

      if(newCabin == 'Economy' || newCabin == 'economy'){


        newESeats = myFlight.eSeatsAvailable - (childrenSeatsReserved + adultsSeatsReserved)
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        eSeatsAvailable: newESeats
       })

       newBSeats = myFlight.bSeatsAvailable + (childrenSeatsReserved + adultsSeatsReserved)
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        bSeatsAvailable: newBSeats
       })

       catcher = 0;
       refundedPrice = myFlight.bSeatsPrice * (adultsSeatsReserved + childrenSeatsReserved*0.5) - myFlight.eSeatsPrice * (adultsSeatsReserved + childrenSeatsReserved*0.5) 

        
        reservation.cabin = 'Economy'
        
      }

      else if (newCabin == 'Business' || newCabin == 'business'){




        newESeats = myFlight.eSeatsAvailable + (childrenSeatsReserved + adultsSeatsReserved)
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        eSeatsAvailable: newESeats
       })

       newBSeats = myFlight.bSeatsAvailable - (childrenSeatsReserved + adultsSeatsReserved)
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        bSeatsAvailable: newBSeats
       })


       catcher = 1;
       debitedPrice = myFlight.bSeatsPrice * (adultsSeatsReserved + childrenSeatsReserved*0.5) - myFlight.eSeatsPrice * (adultsSeatsReserved + childrenSeatsReserved*0.5) 


        
        reservation.cabin = 'Business'
        
      }

    }

    
    if(childrenSeatsReserved != req.body.childrenSeatsReserved){

      if(newCabin == 'Economy' || newCabin == 'economy'){


        newESeats = myFlight.eSeatsAvailable + childrenSeatsReserved - req.body.childrenSeatsReserved
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        eSeatsAvailable: newESeats
       })

       if(childrenSeatsReserved > req.body.childrenSeatsReserved){
         catcher = 0;
         refundedPrice =  refundedPrice +  myFlight.eSeatsPrice * (childrenSeatsReserved - req.body.childrenSeatsReserved)*0.5
       }
       else{
         catcher = 1;
        debitedPrice=  debitedPrice +  myFlight.eSeatsPrice * (req.body.childrenSeatsReserved -childrenSeatsReserved )*0.5
       }
      

      reservation.childrenSeatsReserved = req.body.childrenSeatsReserved

      

      }

      else if (newCabin == 'Business' || newCabin == 'business'){

        newBSeats = myFlight.bSeatsAvailable + childrenSeatsReserved - req.body.childrenSeatsReserved
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        bSeatsAvailable: newBSeats
       })  
       
       if(childrenSeatsReserved > req.body.childrenSeatsReserved){
         catcher = 0;
        refundedPrice =  refundedPrice +  myFlight.bSeatsPrice * (childrenSeatsReserved - req.body.childrenSeatsReserved)*0.5
      }
      else{
        catcher = 1;
       debitedPrice=  debitedPrice +  myFlight.bSeatsPrice * (req.body.childrenSeatsReserved - childrenSeatsReserved )*0.5
      }
       
        reservation.childrenSeatsReserved = req.body.childrenSeatsReserved
      }
    }




    if(adultsSeatsReserved != req.body.adultsSeatsReserved){

      if(newCabin == 'Economy' || newCabin == 'economy'){
        newESeats = myFlight.eSeatsAvailable + adultsSeatsReserved - req.body.adultsSeatsReserved
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        eSeatsAvailable: newESeats
       })
       
       if(adultsSeatsReserved > req.body.adultsSeatsReserved){
         catcher = 0;
        refundedPrice =  refundedPrice +  myFlight.eSeatsPrice * (adultsSeatsReserved - req.body.adultsSeatsReserved)
      }
      else{
        catcher = 1;
       debitedPrice=  debitedPrice +  myFlight.eSeatsPrice * ( req.body.adultsSeatsReserved - adultsSeatsReserved)
      }
     
      reservation.adultsSeatsReserved = req.body.adultsSeatsReserved
      }

      else if (newCabin == 'Business' || newCabin == 'business'){
        newBSeats = myFlight.bSeatsAvailable + adultsSeatsReserved - req.body.adultsSeatsReserved
        await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
        bSeatsAvailable: newBSeats
       })  

       if(adultsSeatsReserved > req.body.adultsSeatsReserved){
         catcher = 0;
        refundedPrice =  refundedPrice +  myFlight.bSeatsPrice * (adultsSeatsReserved - req.body.adultsSeatsReserved)
      }
      else{
        catcher = 1;
       debitedPrice=  debitedPrice +  myFlight.bSeatsPrice * (req.body.adultsSeatsReserved - adultsSeatsReserved)
      }
     


        reservation.adultsSeatsReserved = req.body.adultsSeatsReserved
      }
    }


if(catcher == 0){

    const options = {

      from: "aclproject2021Sallam@outlook.com",
      to: userEmail,
      subject: "Billing Update",
      text:
        "Dear," + user.firstName + " " + user.lastName + ",\n" +
        " This is a Billing Update mail that you have done some changes to your reservation and the refunded amount is shown below:" +
        "                                                                      \n" +
        "\n      From: " + myFlight.from +
        "\n      To: " + myFlight.to +
        "\n      Cabin: " + newCabin +
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


  }

  else{
    const options = {

      from: "aclproject2021Sallam@outlook.com",
      to: userEmail,
      subject: "Billing Update",
      text:
        "Dear," + user.firstName + " " + user.lastName + ",\n" +
        " This is a Billing Update mail that you have done some changes to your reservation and the Debited amount is shown below:" +
        "                                                                      \n" +
        "\n      From: " + myFlight.from +
        "\n      To: " + myFlight.to +
        "\n      Cabin: " + newCabin +
        "\n      Departure: " + myFlight.departureDate + " " + myFlight.departureTime +
        "\n      Arrival: " + myFlight.arrivalDate + " " + myFlight.arrivalTime +
        "\n      Departure Terminal: " + myFlight.departureTerminal +
        "\n      Arrival Terminal: " + myFlight.arrivalTerminal +
        "\n      Debited Amount is: " + debitedPrice
    }
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err)
        return
      }
      console.log("Sent: " + info)
    });
  }
  
})

router.route('/cancel/').put(async (req, res) => {
  const bookingNumber = req.body.bookingNumber
  const reservation = await Reservation.findOne({ 'bookingNumber': bookingNumber })
  const passportNumber = reservation.passportNumber
  const flightNumber = reservation.flightNumber
  const flight = await Flight.findOne({ 'flightNumber': flightNumber })
  const cabin = reservation.cabin
  const childrenSeatsReserved = reservation.childrenSeatsReserved
  const adultsSeatsReserved = reservation.adultsSeatsReserved
  const user = await User.findOne({ 'passportNumber': passportNumber })
  const userEmail = user.email
  var refundedPrice = 0;



  const myFlight = await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
    $pull: {
      reservedUsers: passportNumber
    }
  })
  console.log(myFlight.reservedUsers)

  const myUser = await User.findOneAndUpdate({ 'passportNumber': passportNumber }, {
    $pull: {
      flightsreserved: flightNumber
    }
  })
  let newSeats = 0
  if (cabin == "Economy" || cabin == "economy") {
    newSeats = myFlight.eSeatsAvailable + childrenSeatsReserved + adultsSeatsReserved
    await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
      eSeatsAvailable: newSeats
    })
    refundedPrice = 0.9 * ((myFlight.eSeatsPrice * adultsSeatsReserved) + (myFlight.eSeatsPrice * childrenSeatsReserved * 0.5))


  }

  else if (cabin === "Business" || cabin == "business") {
    newSeats = myFlight.bSeatsAvailable + childrenSeatsReserved + adultsSeatsReserved
    await Flight.findOneAndUpdate({ 'flightNumber': flightNumber }, {
      bSeatsAvailable: newSeats
    })
    refundedPrice = 0.9 * ((myFlight.bSeatsPrice * adultsSeatsReserved) + (myFlight.bSeatsPrice * childrenSeatsReserved * 0.5))
    console.log(refundedPrice)


  }


  const options = {

    from: "aclproject2021Sallam@outlook.com",
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



// router.route('/updateUser/:passportNumber').put(async(req, res) => {


//   const passportNumberParams= req.params.passportNumber;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;
//   const passportNumber = req.body.passportNumber;
//   const oldPassword=req.body.oldPassword;
//   let user = await User.findOne({'passportNumber':passportNumberParams})
//   if(oldPassword){
//     const passwordCorrect= await bcrypt.compare(oldPassword,user.password)
//     if(passwordCorrect){
//       console.log("password correct")
//       let newPassword= await bcrypt.hash(req.body.newPassword, 10)
//       let x=await User.findOneAndUpdate({'passportNumber':passportNumberParams},{'password':newPassword},{'firstName':firstName},{'lastName':lastName},
//       {'email':email},{'passportNumber':passportNumber})
//       console.log(x)


//     }

//   }



// })

// router.put('/updateUser/:passportNumber', async (req, res) => {
      
//   try {
//     User.findOneAndUpdate(req.params.passportNumber, req.body, { new: true }, (err, model) => {   
      
//       if (!err) {
//         return res.json({ data: model })
      
//       } 
      
//       else {
//         return res.data({ error: `User not found` })
//       }
//     })
//   }
//   catch (e) {
//     return res.data({ error: `Request Error` })

//   }

// })

router.put('/updateUser/:passportNumber', async (req, res) => {
      
  try {

    User.findOneAndUpdate(req.params.passportNumber, req.body, { new: true }, (err, model) => {   
      
      if (!err) {
        return res.json({ data: model })
      
      } 
      
      else {
        return res.json({ error: `User not found` })
      }
    })
    const passportNumber=parseInt(req.params.passportNumber);
    let newPassword= await bcrypt.hash(req.body.newPassword, 10)
        let x=await User.findOneAndUpdate({'passportNumber':passportNumber},{'password':newPassword})
        // console.log(x)
    
      }
  
    
   
  
  catch (e) {
    return res.json({ error: `Request Error` })

  }

})


module.exports = router;