
exports.chatAddHistory = function (userid, username, message, dateTime) {

    var chatmod = require('../model/messageSchema');

    var response = {};
    var db = new chatmod();

    db.userid = userid;
    db.username = username
    db.message = message;
    db.dateTime = dateTime;


    db.save(function (err) {

        if (err) {

            response = {
                'message': "Error in Data Fetching"
            }
        } else {

            response = {

                'message': "Message Data successfully Saved into DataBase "
            }
        };
        console.log(response);
    })

}

