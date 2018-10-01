
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatAppData',{ useNewUrlParser: true,  useCreateIndex: true,
});

// create instance of Schema


var mongoSchema =   mongoose.Schema;
// create schema
var chatSchema  = new mongoSchema({

    'userid': {
        type: String,
        required: true
    },
    'username': {
        type: String,
        required: true
    },
    'message': {
        type: String,
        required: true
    },
    'dateTime': {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('messageData', chatSchema);