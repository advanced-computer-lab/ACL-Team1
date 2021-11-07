const router = require('express').Router();
let Flight = require('../models/flight.model');


router.route('/').get((req,res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req,res) => {


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
});

router.route('/find/:id').get((req,res) => {
  Flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/findfrom/:from', (req,res) => {
    Flight.find({from: req.params.from}).then(flight => res.json(flight));
});

router.get('/findto/:to', (req,res) => {
  Flight.find({to: req.params.to}).then(flight => res.json(flight));
});

router.get('/findcabin/:cabin', (req,res) => {
  Flight.find({cabin: req.params.cabin}).then(flight => res.json(flight));
});

router.get('/findterminals/:terminal', (req,res) => {
  Flight.find({terminal: req.params.terminal}).then(flight => res.json(flight));
});

router.get('/findtarrivaltime/:arrivalTime', (req,res) => {
  Flight.find({arrivalTime: req.params.arrivalTime}).then(flight => res.json(flight));
});

router.get('/finddeparturetime/:departureTime', (req,res) => {
  Flight.find({departureTime: req.params.departureTime}).then(flight => res.json(flight));
});

router.get('/finddate/:date', (req,res) => {
  Flight.find({flightDate: req.params.flightDate}).then(flight => res.json(flight));
});

module.exports = router;
