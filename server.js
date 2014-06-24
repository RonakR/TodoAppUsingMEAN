// This is the file where I:
// -Configure the application
// -Connect to the database
// -Create the Mongoose models
// -Define routes for the RESTful API
// -Define routes for the frontend Angular application
// -Set the app to listen on a port so we can view it on the browser

// Server ======================================================================
// Set up
var express = require('express');
var app = express();                                 //Create the app w/ express
var mongoose = require('mongoose');                  //mongoose for mongodb

// configuration
mongoose.connect('mongodb://localhost:27017');       // connect to mongoDB

app.configure(function() {
  app.use(express.static(__dirname + '/public'));    // set the static files location /public/img will be /img for users
  app.use(express.logger('dev'));                    // log every request to the console
  app.use(express.bodyParser());                     // pull information from html in POST
});

// define model
var Todo = mongoose.model('Todo', {
  text : String
})



// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on post 8080");



// Routes ======================================================================

// API -------------------------------------------------------------------------

// get all todos
app.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function(err, todos) {

    // if there is an error retrieving, send the error, nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(todos); //return all todos in JSON format
  });
});


// create a todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

  //create a todo, information comes from AJAX request from Angular
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
      if (err) res.send(err);

      //get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if (err) res.send(err)
        res.json(todos);
      });
  });
});

// delete a todo

app.delete('/api/todos/:todo_id', function(req, res) {

  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
      if (err)
        res.send(err);

      Todo.find(function(err, todos) {
        if(err)
          res.send(err)
        res.json(todos);
      });
  });
});

// Application -----------------------------------------------------------------
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); //load the single view file (angular will handle the page changes on the frontend)
});
