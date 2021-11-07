const router = require('express').Router();
const User = require('../models/user.model');
let Flight = require('../models/flight.model');


router.route('/').get((req,res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req,res) => {
  User.findById(req.params.id)
   .then(user => res.json(user))
   .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/findUserIsAdmin/:isAdmin', (req,res) => {
  User.find({isAdmin: req.params.isAdmin}).then(user => res.json(user));
});

router.get('/findUserName/:name', (req,res) => {
  User.find({name: req.params.name}).then(user => res.json(user));
});

router.get('/findUserEmail/:email', (req,res) => {
User.find({email: req.params.email}).then(user => res.json(user));
});

router.get('/findUserAge/:age', (req,res) => {
User.find({age: req.params.age}).then(user => res.json(user));
});

router.get('/findUserBirthPlace/:birthPlace', (req,res) => {
User.find({birthPlace: req.params.birthPlace}).then(user => res.json(user));
});

router.get('/findUserPhoneNumber/:phoneNumber', (req,res) => {
User.find({phoneNumber: req.params.phoneNumber}).then(user => res.json(user));
});

User.isAdmin = true;

router.route('/addUser').post((req,res) => {

  
  if(User.isAdmin)
  {
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
  else
  {
    res.send("You are not an admin");
  }
});
 


router.route('/updateUser/:id').post((req,res) => {

  if(User.isAdmin)
  {
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
  else
  {
    res.send("You are not an admin!");
  }
  
});

router.route('/deleteUser/:id').delete((req,res) => {
  if(User.isAdmin)
  {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  else
  {
    res.send("You are not an admin!");
  }
  
});

router.route('/addFlight').post((req,res) => {

 if(User.isAdmin)
  {

   const from = req.body.from;
   const to = req.body.to;
   const cabin = req.body.cabin;
   const seatNumber = Number(req.body.seatNumber);
   const flightDate = req.body.flightDate;
   const arrivalTime = req.body.arrivalTime;
   const departureTime = req.body.departureTime;
   const terminal = req.body.terminal;

   const newFlight = new Flight({
    from,
    to,
    cabin,
    seatNumber,
    flightDate,
    arrivalTime,
    departureTime,
    terminal
    
   });

  newFlight.save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  else
  {
    res.send("You are not an admin!");
  }
 
    
});


router.route('/updateFlight').put((req,res) => {


if(User.isAdmin)
 {
  const fromOld = req.body.fromOld;
  const toOld = req.body.toOld;
  const seatsOld=req.body.seatsOld;
  const cabinOld = req.body.cabinOld;
  const flightDateOld = req.body.flightDateOld;
  const arrivalTimeOld = req.body.arrivalTimeOld;
  const departureTimeOld = req.body.departureTimeOld;
  const terminalOld = req.body.terminalOld;

  const from = req.body.from;
  const to = req.body.to;
  const seats=req.body.seats;
  const cabin = req.body.cabin;
  const flightDate = req.body.flightDate;
  const arrivalTime = req.body.arrivalTime;
  const departureTime = req.body.departureTime;
  const terminal = req.body.terminal;


  Flight.findOneAndUpdate( { 'from': fromOld , 'to': toOld , 'seatNumber':seatsOld, 'cabin': cabinOld,'flightDate':flightDateOld, 'arrivalTime':arrivalTimeOld,'departureTime':departureTimeOld,'terminal':terminalOld}
  ,{'from': from , 'to': to ,'seatNumber':seats, 'cabin': cabin ,'flightDate':flightDate, 'arrivalTime':arrivalTime,'departureTime':departureTime,'terminal':terminal})
    .then(flights => res.json("Flight updated!"))
    .catch(err => res.status(400).json('Error: ' + err));

 }
 else
 {
   res.send("You are not an admin");
 }
});

router.route('/deleteFlight').delete((req,res) => {


if(User.isAdmin)
{

  const prompt = require('prompt-sync')(); 
  const answer = prompt('Are you sure you want to delete? type true if yes otherwise false.');

  const from = req.body.from;
  const to = req.body.to;
  const cabin = req.body.cabin;
  const seats=req.body.seats;
  const flightDate = req.body.flightDate;
  const arrivalTime= req.body.arrivalTime;
  const departureTime=req.body.departureTime;
  const terminal= req.body.terminal;


  if(answer=='true'){


    Flight.findOneAndDelete( {'from': from , 'to': to ,'cabin': cabin,'seatNumber':seats  ,'flightDate':flightDate,'arrivalTime':arrivalTime,'departureTime':departureTime,'terminal':terminal})
    .then(flights => res.json("Flight deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  
   else{

     res.send("No delete.")
   }
 }
 else
 {
   res.send("You are not an admin!");
 }
});



module.exports = router;
