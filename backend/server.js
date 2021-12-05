const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");




const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use(express.json());

const usersRoute = require('./routes/users');
const flightsRoute = require('./routes/flights');
const reservationsRoute=require('./routes/reservations');
const User = require('./models/user.model');
const Flight = require('./models/flight.model');

app.use('/users', usersRoute);
app.use('/flights', flightsRoute);
app.use('/reservations', reservationsRoute);
// app.use("*", (req,res) => res.status(404).json({error: "not found"}))



app.get('/', function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req,res){

  let newUser = new User({

    isAdmin: req.body.addUserIsAdmin,
    name: req.body.addUserName,
    email : req.body.addUserEmail,
    age: req.body.addUserAge,
    birthPlace : req.body.addUserBirthPlace,
    phoneNumber : req.body.addUserPhoneNumber,
    
  });
  newUser.save();
  res.send("User added!");
  
});




const mongoose = require("mongoose");

const MongoURI = "mongodb://aclproject:aclproject1@flightsdb-shard-00-00.h7puf.mongodb.net:27017,flightsdb-shard-00-01.h7puf.mongodb.net:27017,flightsdb-shard-00-02.h7puf.mongodb.net:27017/flightsDB?ssl=true&replicaSet=atlas-jr8mqb-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));





app.listen(3001, function(){
  console.log("Server has started at port 3001");
});


