
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

 exports.peerchatHistory=function(senderid,sendername,receiverid,receivername,message,dateTime)
    {

        console.log(senderid)
        console.log(sendername);
        console.log(receiverid);
        console.log(receivername);
        console.log(message)
        
        var peermod = require('../model/peerSchema');
        var response={};
       var db=new peermod();

        db.senderid=senderid;
        db.sendername=sendername;
        db.receiverid=receiverid;
        db.receivername=receivername;
        db.message=message;
        db.dateTime=dateTime
        
        db.save(function(err){
            if(err)
      
            {
                response={
                   
                    "message":"error occured data",
                  
                }
            }
            else{
                response={
                  
                    "message":"message saved into the database"
                }
            };
        
            console.log(response);
        })
    }
