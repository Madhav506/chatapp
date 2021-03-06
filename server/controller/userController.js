const secret = "secret";
var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var auth = require('../../authentication');

function encryption(password) {
    var pass = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');
    return pass;
}
var express = require('express');

const { check, validationResult } = require('express-validator/check');




/**api for login */

router.post("/login", [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(422).json({ errors: errors.array() });
    }

    var email = req.body.email;
    var password = req.body.password;
    var response = {};
    var userModel = require('../model/userschema.js')
    var jwt = require('jsonwebtoken');
    var config = require('../config/config.js');


    userModel.find({ "email": email, "password": encryption(password) }, function (err, data) {
    console.log("data from login" );

       
        try {

            if (err) {
                response = {
                    'message': "error fetching data"
                }
                return res.status(404).send(response);

            }
            else {
                if (data.length > 0) {
                    var id, token;
                    token = jwt.sign({
                        email: email,
                        password: password
                    }, secret, {
                            expiresIn: '20d'
                        });
                        console.log(data)
                    var userid = data[0]._id;
                    var username = data[0].firstname;
                    var response = { "message": "login successful", "username":username,"userid": userid };
                    // create a token
                    //config.secret  returns the correct configuration
                    var token = jwt.sign({ id: userModel._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return res.status(200).send({ authentication: true, token: token, message: response });

                }
                else {
                    response = {
                        'message': "invalid credentials"
                    }
                    return res.status(404).send(response);
                }
            }


        }

        catch (e) {
            console.log(e);
            if (e instanceof ReferenceError
                || e instanceof TypeError
                || e instanceof SyntaxError
                || e instanceof RangeError) {
                return res.json({
                    "error": true,
                    "message": "invalid"
                });
            } else {
                return res.json({
                    "error": true,
                    "message": e.message
                });
            }

        }

    })


}

);
/**api for register */

router.post('/register', [
    check('firstname').isLength({ min: 3 }),
    check('lastname').isLength({ min: 3 }),
    check('mobilenumber').isNumeric().isLength({ min: 10, max: 10 }),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var userModel = require('../model/userschema.js')
    var db = new userModel();


    db.firstname = req.body.firstname;
    db.lastname = req.body.lastname;
    db.mobilenumber = req.body.mobilenumber;


    db.email = req.body.email;
    // Hash the password using SHA1 algorithm.
    db.password = encryption(req.body.password)



    userModel.find({ "email": req.body.email }, function (err, data) {

        if (err) {
            response = {
                'message': "error fetching data"
            }
            return res.status(404).send(response);

        }
        if (data.length > 0) {
            response = {
                //"error": false,
                "message": "emailid already exists",
            }
            return res.status(404).send(response);
        }
        if (err) {
            response = {
                //"error": true,
                "message": "error occured"
            }
            return res.status(404).send(response);
        }

        else {
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
                return res.status(200).send({ response });

            });
        }
    });

});

/**api to retrieve data from database */

router.get('/details', function (req, res) {
    var userModel = require('../model/userschema.js')
    var db = new userModel();
    userModel.find({}, function (err, data) {


        if (!err) {
            res.json(data);
        }
    });

});


/** api to get the userlist who were logged in*/

router.get('/users/:id/userlist', auth, function (req, res) {

    var userModel = require('../model/userschema.js')
    var db = new userModel();
    var userid = req.params.id;
    var response = {};
    var friendsarrlist = [];
    userModel.find({
        "_id": {
            $ne: (userid)
        }

    }, function (err, data) {
        console.log(data);
        if (err) {
            response = {
                "message": "error fetching data"
            }
        } else {
            response = {
                "message": data
            };
        }
        if (response.message.length)

            for (var i = 0; i < response.message.length; i++) {
                friendsarrlist.push({
                    username: response.message[i].firstname, userid: response.message[i]._id
                });
            }
        respo = { 'message': friendsarrlist };
        console.log(respo)
        return res.status(200).send(respo);


    });

});
router.get('/chatlist',auth,function (req, res) {
    var jwt = require('jsonwebtoken');
    var chatmod = require('../model/messageSchema');
    var db = new chatmod();
    var respo = {};

    chatmod.find({}, function (err, data) {

        if (err) {

            respo = {
                'Success': "false",
                'message': "Error in fetching data "
            }
        } else {
            respo = {
                'Success': 'true',
                'message': data
            }
        }

       // console.log(respo)
        return res.status(200).send(respo);
    });
});



router.get('/peerchat/:senderid/:receiverid',auth,function(req,res){
  
    var jwt = require('jsonwebtoken');
    var peermod = require('../model/peerSchema');
    var db = new peermod();

    var senderid = req.params.senderid;
    var receiverid=req.params.receiverid;



    // console.log("data in peerlist",senderid);
    // console.log("data in peerlist",receiverid);

    var respo={};

   peermod.find({$or:[{'senderid':senderid,'receiverid':receiverid},{'receiverid':receiverid,'senderid':senderid}]}, function (err, data) 
{

    if (err) {

        respo = {
           
            'message': "Error in fetching data "
        }
    } else {
        respo = {
            
            'message': data

        }

        console.log(respo);
    }

   // console.log(respo)
    return res.status(200).send(respo);

})
})






app.use('/', router);
// ConnectDB();

module.exports = router;

