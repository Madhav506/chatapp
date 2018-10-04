
var express = require("express");//including the libraries of express
/*assigning those all express lib to a variable app*/
const app = express();
var socket=require('socket.io');
var users=require('./server/controller/chatAdd')
/**body-parser is which allows express to read the body and then parse that into a Json object that we can understand. */
//bodyparser used to get access to post the data
var bodyParser = require("body-parser");

//including mongoose
//object data modeling to simplify interactions with MongoDB)
var mongoose = require('mongoose');

/**using the body parser to parse the data to json object and json to be used*/
app.use(bodyParser.json());

//allows simple algorithm for shallow parsing
app.use(bodyParser.urlencoded({ "extended": false }));


 var expressValidator = require('express-validator');
   
 app.use(expressValidator());

var router = require('./server/controller/userController');
app.use('/', router);//mounts the function at specified path

//app.listen(8000);//only works on port 8000

//Routing To Public Folder For Any Static Context
app.use(express.static('./public'));

var server=app.listen(8000);
console.log("Listening to PORT 8000");


//socket setup
var io= socket(server);

io.on('connection', function(client){

    console.log('A user entered');

    client.on('disconnect', function(){
        console.log("socket disconnected ")
    })

  
        client.on('chatRoomBackend', function(data) {
               
        users.chatAddHistory(data.userid, data.username, data.message, data.dateTime);
        
        io.emit('chatroomClient', data);
        //client.broadcast.emit('chatroomClient', data);
    })



    client.on('peerchatbackend',function(data){
        console.log("in")
        users.peerchatHistory(data.senderid,data.sendername,data.receiverid,data.receivername,data.dateTime);
        io.emit(data.receiverid,data);
    })

});



