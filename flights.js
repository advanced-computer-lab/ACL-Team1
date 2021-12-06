const router = require('express').Router();
let Flight = require('../models/flight.model');
const obj = {}



router.route('/').get((req, res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Flight.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});

// router.route('/:flightNumber').get((req, res) => {
//   Flight.find({ flightNumber: req.params.flightNumber }).then(flight => res.json(flight));
// });

// router.route('/search').post((req, res) => {
//   const flightNumber = req.body.flightNumber
//   // console.log(flightNumber)
//   obj["flightNumber"] = flightNumber
//   // console.log(obj)
//   Flight.find({ flightNumber: flightNumber }).then(response => res.json(response));

// });

//  exports.search = (req, res) => {
//   Flight.find(req.body)
//   .then(result => {
//   res.send(result).
//   1)
//   (parameter) err: any
//   .catch(err => f
//   console.log(err);
// //   });

// router.route('/getResult').get((req, res) => {
//   Flight.find(obj, (req, result) => {
//     // console.log(result)
//   })

// })

// /find ,, body = {from:ghj,to:iidii}
router.post('/find' , (req,res) => {


Flight.find(req.body).then(flight => res.json(flight))
.catch(err => res.status(400).json('Error: ' + err));

  });



  module.exports = router;