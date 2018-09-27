
var express = require("express");//including the libraries of express
/*assigning those all express lib to a variable app*/
const app = express();

/**body-parser is which allows express to read the body and then parse that into a Json object that we can understand. */
//bodyparser used to get access to post the data
var bodyParser = require("body-parser");
//var router = express.Router();
//including mongoose
//object data modeling to simplify interactions with MongoDB)

var mongoose = require('mongoose');

/**using the body parser to parse the data to json object and json to be used*/
app.use(bodyParser.json());

//allows simple algorithm for shallow parsing
app.use(bodyParser.urlencoded({ "extended": false }));


 var expressValidator = require('express-validator');
   
 app.use(expressValidator());



var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var config = require('./server/config/config.js');

var router = require('./server/controller/userController');
app.use('/', router);//mounts the function at specified path

// var io = require('socket.io')(server);



app.listen(8000);//only works on port 8000
console.log("Listening to PORT 8000");


app.use(express.static('./public'));