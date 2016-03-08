var express = require("express");
var Client = require("node-rest-client").Client;
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;

var client = new Client();

var app = express();

//globally allowing CORS
app.all('/shivatejam/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
  });

//get all the description from Mongodb for home page
app.get('/shivatejam/home/Description', function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    //connect to MongoDB
    MongoClient.connect("mongodb://shivateja:1234@ds023398.mlab.com:23398/shivatejam", function(err, db) {
        if(err) { return console.dir(err); }
        var collection = db.collection('description');
        
            collection.find().toArray(function(err, description) {
                //var innerArray = description.toArray();
                
                console.log("description " + description[0]["MainDescription"]);
                // here ...
                
                res.json(description);
            });    
        });


    //var returnJson = '{"key1":"value1"}';
             
});



app.listen(8235);
console.log('Server Started on 8235');