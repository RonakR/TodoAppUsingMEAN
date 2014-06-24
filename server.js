// This is the file where I:
// -Configure the application
// -Connect to the database
// -Create the Mongoose models
// -Define routes for the RESTful API
// -Define routes for the frontend Angular application
// -Set the app to listen on a port so we can view it on the browser

// Set up
console.log("here");
var express = require('express');
var app = express();                                 //Create the app w/ express
var mongoose = require('mongoose');                  //mongoose for mongodb

//configuration
mongoose.connect('mongodb://localhost:27017');                                // connect to mongoDB

app.configure(function() {
  app.use(express.static(__dirname + '/public'));    // set the static files location /public/img will be /img for users
  app.use(express.logger('dev'));                    // log every request to the console
  app.use(express.bodyParser());                     // pull information from html in POST
});

//listen (start app with node server.js)
app.listen(8080);
console.log("App listening on post 8080")
