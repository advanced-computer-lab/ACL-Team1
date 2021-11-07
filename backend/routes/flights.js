const router = require('express').Router();
let Flight = require('../models/flight.model');

router.route('/').get((req,res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/find/:id').get((req,res) => {
  Flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/findFlightFrom/:from', (req,res) => {
    Flight.find({from: req.params.from}).then(flight => res.json(flight));
});

router.get('/findFlightTo/:to', (req,res) => {
  Flight.find({to: req.params.to}).then(flight => res.json(flight));
});

router.get('/findFlightCabin/:cabin', (req,res) => {
  Flight.find({cabin: req.params.cabin}).then(flight => res.json(flight));
});

router.get('/findFlightTerminal/:terminal', (req,res) => {
  Flight.find({terminal: req.params.terminal}).then(flight => res.json(flight));
});

router.get('/findFlightArrivaltime/:arrivalTime', (req,res) => {
  Flight.find({arrivalTime: req.params.arrivalTime}).then(flight => res.json(flight));
});

router.get('/findFlightDeparturetime/:departureTime', (req,res) => {
  Flight.find({departureTime: req.params.departureTime}).then(flight => res.json(flight));
});

router.get('/findFlightDate/:date', (req,res) => {
  Flight.find({flightDate: req.params.flightDate}).then(flight => res.json(flight));
});


module.exports = router;
