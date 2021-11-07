const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());



app.get('/', function(req,res){
  res.send("ACL Project");
});

const mongoose = require("mongoose");

const MongoURI = "mongodb://aclproject:aclproject1@flighdb-shard-00-00.gpxfp.mongodb.net:27017,flighdb-shard-00-01.gpxfp.mongodb.net:27017,flighdb-shard-00-02.gpxfp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1nvd5w-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


const usersRoute = require('./routes/users');
const flightsRoute = require('./routes/flights');

app.use('/users', usersRoute);
app.use('/flights', flightsRoute);


app.listen(3000, function(){
  console.log("Server has started at port 3000");
});
