var express= require('express');
//var validator = require('express-validation')
//app.use(validator());


var router=express.Router();
var app = express();
var users=require('../controller/userContoller.js')
router.post("/login", users.login);
router.post('/register', users.registration);//helps to add new user in mongodb
app.use('/', router);

// ConnectDB();

module.exports=router;

