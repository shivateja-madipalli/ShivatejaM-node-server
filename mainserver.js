var express = require("express");
var Client = require("node-rest-client").Client;
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;


var client = new Client();

var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

//https://api.github.com/users/shivateja-madipalli/repos?type=all&sort=created
var githubUrl = "https://api.github.com/users/shivateja-madipalli/repos";


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


app.get('/shivatejam/githubrepos', function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    //get from githubrepos

    githubUrl + "?type=all&sort=created";
     
    var headerForRequest = {
    headers: {'user-agent': 'node.js'}
    }
    client.get(githubUrl,headerForRequest,function(Data,Response){
            console.log("github data: " + Data);
            var finalResult = editGitJson(Data);
            console.log("final result: " + JSON.stringify(finalResult));
            res.json(finalResult);
    });
});

//app.listen(8235);
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
console.log('Server Started on 8235');


function editGitJson(Data){
    // var requiredjsondata = [];
    // requiredjsondata = "[";
    var returnJson = {
        data : []
    };
    for(var i=0;i<Data.length;i++)
    {
        var gitProj = {
            "name" : JSON.stringify(Data[i].name),
             "html_url" : JSON.stringify(Data[i].html_url),
            "description" : JSON.stringify(Data[i].description),
             "created_at" : JSON.stringify(Data[i].created_at),
             "language" : JSON.stringify(Data[i].language)
        }
        
        returnJson.data.push(gitProj);
    }
        
    return returnJson;
    
}