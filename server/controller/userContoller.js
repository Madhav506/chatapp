function encryption(password) {
    var pass= require('crypto')
         .createHash('sha1')
         .update(password)
         .digest('base64');
         return pass;
 }



 exports.registration = function (req, res) {
    var userModel = require('../model/userschema')
    var db = new userModel();
     var response = {};
     req.checkBody("email", "Enter a valid email address.");
     req.checkBody("firstname", "Enter a valid firstname");
     req.checkBody("lastname", "Enter a valid lastname");

    var mail = req.body.email;
     db.firstname = req.body.firstname;
     db.lastname = req.body.lastname;
     db.username = req.body.username;
     db.email = req.body.email;
     db.mobilenumber = req.body.mobilenumber;
     db.password = encryption(req.body.password);
      userModel.find({ "email": mail }, function (err, data) {
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
         else {
             db.save(function (err) {
                 if (err) {
                     response = {
                         "error": true,
                         "message": " error storing data "
                     }
                 }
                 else {
                     response = { "error": false, "message": "data added" }
                     console.log(db);
                 }

                return res.status(202).send(response);
                
             });
             
         }
         
     });


 }

 exports.login=function(req,res){

   


     var response={};
     var userModel = require('../model/userschema')
     userModel.find({ "username": req.body.username, "password": encryption(req.body.password) }, function (err, data) {
        
         if(err){
             response={
                 "error":true,
                 "meassage":"error fetching data"
             }
             return res.status(404).send(response);
         }else{
             if (data.length > 0) {
                 response = {
                     "error": false,
                     "message": "login succesfull",
                 }
                 return res.status(200).send(response);
             }
             else {
                 response = {
                     "error": false,
                     "message": "invalid credentials"
                 }
                 return res.status(404).send(response);
             }
         }
        
     })
 
 }
