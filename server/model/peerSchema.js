/**create instance of schema*/
var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/chatAppData',{ useNewUrlParser: true,  useCreateIndex: true,
});

var mongoSchema =   mongoose.Schema;
// create schema
var peerschema  = new mongoSchema({
            'senderid'  : {
                        type : String,
                         required: true
                        
                    },
            'sendername':{
                        type: String,
                        required: true
                        
                    },
            'receiverid':  {
                        type: String,
                        required: true
                    },
            'receivername':{
                            type: String, 
                            required: true
                        },
            'message':  {
                            type: String,
                            required: true
                        },
            'dateTime':{
                                type: String, 
                                required: true
                            }
    
});
// create model if not exists.
module.exports = mongoose.model('peerchat',peerschema);