const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req,res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});







router.route('/update').post((req,res) => {



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

module.exports = router;
