const router = require('express').Router();
let User = require('../models/user.model');
let  Flight= require('../models/flight.model');

router.route('/').get((req,res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = Number(req.body.age);
  const bornIn = req.body.bornIn;
  const phoneNumber = req.body.phoneNumber;



  const newUser = new User({
    name,
    email,
    age,
    bornIn,
    phoneNumber,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/Update').put((req,res) => {


  const fromOld = req.body.fromOld;
  const toOld = req.body.toOld;
  const seatsOld=req.body.seatsOld;
  const cabinOld = req.body.cabinOld;
  const flightDateOld = (req.body.flightDateOld);

  const from = req.body.from;
  const to = req.body.to;
  const seats=req.body.seats;
  const cabin = req.body.cabin;
  const flightDate = Date.parse(req.body.flightDate);

  Flight.findOneAndUpdate( { 'from': fromOld , 'to': toOld , 'seatNumber':seatsOld, 'cabin': cabinOld,'flightDate':flightDateOld }
  ,{'from': from , 'to': to ,'seatNumber':seats, 'cabin': cabin ,'flightDate':flightDate})
    .then(flights => res.json("DONE"))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/Delete').delete((req,res) => {

  
  
  const from = req.body.from;
  const to = req.body.to;
  const cabin = req.body.cabin;
  const seats=req.body.seats;
  const flightDate = req.body.flightDate;
  const arrivalTime= req.body.arrivalTime;
  const departureTime=req.body.departureTime;
 const terminal= req.body.terminal;

  

   Flight.findOneAndDelete( {'from': from , 'to': to ,'cabin': cabin,'seatNumber':seats  ,'flightDate':flightDate,'arrivalTime':arrivalTime,'departureTime':departureTime,'terminal':terminal})
     .then(flights => res.json("DONE"))
     .catch(err => res.status(400).json('Error: ' + err));
  
  
});

module.exports = router;
