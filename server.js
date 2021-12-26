const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();







const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

const usersRoute = require('./routes/users');
const flightsRoute = require('./routes/flights');
const reservationsRoute = require('./routes/reservations');
const User = require('./models/user.model');
const Flight = require('./models/flight.model');

app.use('/users', usersRoute);
app.use('/flights', flightsRoute);
app.use('/reservations', reservationsRoute);
// app.use("*", (req,res) => res.status(404).json({error: "not found"}))



app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", async (req, res) => {
  const user = req.body;

  const takenEmail = await User.findOne({email: user.email})
  
  if(takenEmail) {
    res.json({message: "Email has already been taken"})
  } else {
    user.password = await bcrypt.hash(req.body.password, 5)

    const dbUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      passportNumber: user.passportNumber,
      email: user.email,
      password: user.password
    })

    dbUser.save()
    res.json({message: "Success"})
  }
})
app.post("/login", (req, res) => {
    
  const userLoggingIn = req.body;

  
      User.findOne({email: userLoggingIn.email})
      .then(dbUser => {
          if (!dbUser) {
              return res.json({message: "Invalid Email or Password"})
          }
          bcrypt.compare(userLoggingIn.password, dbUser.password)
          .then(isCorrect => {
              if (isCorrect) {
                  const payload = {
                      id: dbUser._id,
                      email: dbUser.email,
                      firstName:dbUser.firstName,
                      lastName:dbUser.lastName,
                      passportNumber:dbUser.passportNumber
                  }
                  jwt.sign(
                      payload, 
                      process.env.JWT_SECRET,
                      {expiresIn: 86400},
                  

                  // dbUser.token = token;

                  // res.status(200).json(dbUser);
                  (err, token) => {
                      return res.json({message: "Success", token: "Bearer " + token})
                  }
                )    
              } else {
                  return res.json({message: "Invalid Email or Password"})
              }
          })

      })
  
})

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(' ')[1]

  if(token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if(err) return res.json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.email = decoded.email
      next()
    })
  } else {
    res.json({message: "Incorrect Token Given", isLoggedIn: false})
  }
}

app.get("/isUserAuth", verifyJWT, (req, res) => {
  return res.json({isLoggedIn: true, email: req.user.email})
})

//Way 1 Authentication.

// app.post('/api/register', async (req, res) => {
//   console.log(req.body)
//   try {
//     const newPassword = await bcrypt.hash(req.body.password, 10)
//     await User.create({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: newPassword,
//       passportNumber: req.body.passportNumber
//     })
//     res.json({ status: "ok" })
//   } catch (err) {
//     console.log(err)
//     res.json({ status: "error", error: "Duplicate email" })

//   }
//   res.json({ status: "ok" })
// })

// app.post('/api/login', async (req, res) => {

//   const user = await User.findOne({
//     email: req.body.email,

//   })

//   if (!user) {
//     return { status: 'error', error: 'Invalid login' }
//   }

//   const isPasswordValid = await bcrypt.compare(
//     req.body.password,
//     user.password
//   )

//   if (isPasswordValid) {

//     const token = jwt.sign({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email

//     },
//       "secret123"
//     )
//     return res.json({ status: "ok", user: token })
//   } else {
//     return res.json({ status: "error", user: false })
//   }

// })

// app.get('/api/login', async (req, res) => {

//   const token = req.headers['x-access-token']

//   try {

//     const decoded = jwt.verify(token, 'secret123')
//     const email = decode.email
//   } catch(error) {
//     console.log(error)
//     res.json({ status: 'error', error: 'invalid token' })
//   }


// })

const mongoose = require("mongoose");

const MongoURI = "mongodb://aclproject:aclproject1@flightsdb-shard-00-00.h7puf.mongodb.net:27017,flightsdb-shard-00-01.h7puf.mongodb.net:27017,flightsdb-shard-00-02.h7puf.mongodb.net:27017/flightsDB?ssl=true&replicaSet=atlas-jr8mqb-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));





app.listen(3001, function () {
  console.log("Server has started at port 3001");
});


