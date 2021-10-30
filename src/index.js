const express = require("express");

const app = express();

app.get('/', function(req,res){
  res.send("acl");
});

const mongoose = require("mongoose");

const MongoURI = "mongodb+srv://aclproject:aclproject1@flighdb.gpxfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));



app.listen(3000, function(){
  console.log("Server has started at port 3000");
});
