const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");






const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use(express.json());

const usersRoute = require('./routes/users');
const flightsRoute = require('./routes/flights');
const User = require('./models/user.model');
const Flight = require('./models/flight.model');

app.use('/users', usersRoute);
app.use('/flights', flightsRoute);



app.get('/', function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req,res){

  let newUser = new User({

    isAdmin: req.body.addUserIsAdmin,
    name: req.body.addUserName,
    email : req.body.addUserEmail,
    age: req.body.addUserAge,
    bornIn : req.body.addUserBirthPlace,
    phoneNumber : req.body.addUserPhoneNumber,
    
  });
  newUser.save();
  res.send("User added!");
  
});

app.post('/', function(req,res){

  let newFlight = new Flight({

    from: req.body.addFlightFrom,
    to: req.body.addFlightTo,
    cabin : req.body.addFlightCabin,
    seatNumber: req.body.addFlightSeatNumber,
    flightDate : req.body.addFlightDate,
    arrivalTime : req.body.addFlightArrivalTime,
    departureTime: req.body.addFlightDepartureTime,
    terminal: req.body.addFlightTerminal
    
  });
  newFlight.save();
  res.send("Flight added!");
  
});







  




const mongoose = require("mongoose");

const MongoURI = "mongodb://aclproject:aclproject1@flighdb-shard-00-00.gpxfp.mongodb.net:27017,flighdb-shard-00-01.gpxfp.mongodb.net:27017,flighdb-shard-00-02.gpxfp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1nvd5w-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));





app.listen(3000, function(){
  console.log("Server has started at port 3000");
});
