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
  const flightDate = Date.parse(req.body.flightDate);
  const seatNumber = Number(req.body.seatNumber);


  const newFlight = new Flight({
    from,
    to,
    cabin,
    flightDate,
    seatNumber,
  });

  newFlight.save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
