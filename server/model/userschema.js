var mongoose    =   require("mongoose");
//var connect= require('../config/config');
mongoose.connect('mongodb://localhost:27017/chatAppData',{ useNewUrlParser: true,  useCreateIndex: true,
});
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
            'firstname'  : {
                        type : String, 
                         required: [false, "cannot be empty."],
                        // match:'/a-z,A-Z,0-9/'

                    },
            'lastname':  {
                        type:String, 
                        required: false
                    },
            'username':  {
                        type: String, 
                        //required: false,
                        // unique: true,
                        required: [false, "cannot be empty."]
                    },
            
            'mobilenumber': {
                        type: Number, 
                        required: [false, "cannot be empty."]
                    },
            'email':  {
                        type: String, 
                        required: [true, "cannot be empty."],
                        // unique: true,
                        // match:'//'

                        
                    },
            'password':   {
                            type: String, 
                         required: [true, "cannot be empty."]
                        }
});
// create model if not exists.
module.exports = mongoose.model('userData',userSchema);
