
// create instance of Schema
var mongoSchema =   mongoose.Schema;

// create schema
var messageSchema  = mongoSchema({
    _id:new mongoose.Types.ObjectId(),
    name:{
        message1:String,
        message2:String
    },
    created:{
        type:Date,
       default: Date.now
    }
});
// create model if not exists.
module.exports = mongoose.model('Message',messageSchema);