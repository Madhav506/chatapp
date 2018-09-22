
var express = require("express");//including the libraries of express
/*assigning those all express lib to a variable app*/
var app = express();

/**body-parser is which allows express to read the body and then parse that into a Json object that we can understand. */
//bodyparser used to get access to post the data
var bodyParser = require("body-parser");
//var router = express.Router();
//including mongoose
//object data modeling to simplify interactions with MongoDB)

var mongoose = require('mongoose');

/**using the bosy parser to parse the data to json object and json to be used*/
app.use(bodyParser.json());

//allows simple algorithm for shallow parsing
app.use(bodyParser.urlencoded({ "extended": false }));



var router = require('./server/routes/route.js');
app.use('/', router);//mounts the function at specified path


app.listen(1337);//only works on port 8000
console.log("Listening to PORT 1337");
app.use(express.static('./public'));