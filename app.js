var express = require ("express");
var app = express();
var bodyParser = require('body-parser');
var _ = require("underscore");



// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());


var users = [
       { id: 1,
         username:"reema",
         firstname:"julfi",
         lastname:"chumber",
         age:23
       },
       { id: 2,
         username:"john1",
         firstname:"john",
         lastname:"smith",
         age:33
       },
       { id: 3,
         username:"sandra2",
         firstname:"sandra",
         lastname:"paul",
         age:21
       }
];


//create new user
app.post("/users/", function(req, res){
 var newUser = req.body;
 users.push(newUser);
 res.json(newUser);
});

app.get("/users/", function(req, res){
   res.json(users);
});


// update user('phrase')
app.put('/users/:id', function(req, res) {
	
	// set the value of the id
	var targetId = parseInt(req.params.id);

	// set the value of the id
	var foundUser = _.findWhere(users, {id:targetId});

	// update the username
	foundUser.username = req.body.username;

  // update the username
  foundUser.firstname = req.body.firstname;

  // update the username
  foundUser.lastname = req.body.lastname;


	// send back the edited object
	res.json(foundUser);
});


// delete phrase
app.delete('/users/:id', function(req, res) {
  
  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in `user` array matching the id
  var foundUser = _.findWhere(users, {id:targetId});

  // set a var to assign index to be able to grab it
  // get/find the index of the found item
  var index = users.indexOf(foundUser);

  // remove the item at that index, only remove 1 item
  users.splice(index, 1);
  
  // send back deleted object(aka the variable)
  res.json(foundUser);

});

// set server to localhost:3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});

