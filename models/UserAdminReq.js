const mongoose = require("mongoose")
const Schema = mongoose.Schema

//TODO - MOVE THIS TO A UTIL FUNCTION
var minuteFromNow = function(){
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60 * 5);
    return timeObject;
};

const UserAdminRequestSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    randomKey: {
        type: String,
        required: true,
        unique: true        
    },

    expires: {
        type: Date,
        default: minuteFromNow
    }
});


UserAdminRequestSchema.post('save', function(next) {
    console.log("UserAdminRequest has been saved");
});


const UserAdminRequest = mongoose.model('userAdminRequest', UserAdminRequestSchema)

module.exports = UserAdminRequest; 