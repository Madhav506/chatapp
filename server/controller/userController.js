function encryption(password) {
    var pass= require('crypto')
    .createHash('sha1')
    .update(password)
    .digest('base64');
    return pass;
    }
    
    
var express= require('express');
//var validator = require('express-validation')
//app.use(validator());


var router=express.Router();
var app = express();
//var users=require('../controller/userContoller.js')
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');




const { check, validationResult } = require('express-validator/check');



router.post("/login",[
    check('email').isEmail(),
    check('password').isLength({min:5})
    ],(req, res) => {
        const errors = validationResult(req);
if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
      }

      var response={};
      var userModel = require('../model/userschema.js')
      var jwt = require('jsonwebtoken');
      var config = require('../config/config.js');
      
      
      userModel.find({ "email": req.body.email, "password": encryption(req.body.password) }, function (err, data) {
      
          try{
      
      if(err){
      response={
      'message':"error fetching data"
      }
      return res.status(404).send(response);
      }else{
      if (data.length > 0) {
      response = {
      //"error": false,
      "message": "login succesfull",
      }
      
      // create a token
      var token = jwt.sign({ id: userModel._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
      });
      return res.status(200).send({ authentication: true, token: token ,message:response}); 
      
      //  return res.status(200).send(response);
      }
      else {
      response = {
      'message': "invalid credentials"
      }
      return res.status(404).send(response);
      }
      }
      
      
      }
      
      catch(e){
          console.log(e);
          if (e instanceof ReferenceError 
              || e instanceof TypeError
              || e instanceof SyntaxError
              || e instanceof RangeError) {
              return res.json({
                  "error": true,
                  "message": "invalid"
              });
          }else{
              return res.json({
                  "error": true,
                  "message": e.message
              });
          }
      
      }
      
      
      
      
      
      
      
      
      
      
      })
      

    }

);

router.post('/register', [
check('firstname').isLength({ min: 3 }),
check('lastname').isLength({ min: 3 }),
check('mobilenumber').isNumeric().isLength({min:10,max:10}),
check('email').isEmail(),
check('password').isLength({min:5})
], (req, res) => {

const errors = validationResult(req);
if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
      }

var userModel = require('../model/userschema.js')
var db = new userModel();


db.firstname = req.body.firstname;
db.lastname = req.body.lastname;
db.mobilenumber = req.body.mobilenumber;
// db.username = req.body.username;


db.email = req.body.email;
// Hash the password using SHA1 algorithm.
db.password = encryption(req.body.password)



userModel.find({ "email": req.body.email }, function (err, data) {

        
    if (data.length > 0) {
        response = {
        "error": false,
        "message": "emailid already exists",
        }
        return res.status(404).send(response);
        }
        if (err) {
        response = {
        "error": true,
        "message": "error occured"
        }
        return res.status(404).send(response);
        }
        
        else{
db.save(function (err) {
// save() will run insert() command of MongoDB.
// it will add new data in collection.
if (err) {
response = { "error": true, "message": "Error adding data", "err": err };
} else {
response = { "error": false, "message": "Data added" };
}
// return res.status(202).send(response);
// create a token
var token = jwt.sign({ id: userModel._id }, config.secret, {
expiresIn: 86400 // expires in 24 hours
});
return res.status(200).send({response}); 

});
        }
});

});

app.use('/', router);


// ConnectDB();

module.exports=router;

