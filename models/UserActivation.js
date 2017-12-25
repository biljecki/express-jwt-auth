const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserActivationSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    randomKey: {
        type: String,
        required: true,
        unique: true        
    }

});


UserActivationSchema.post('save', function(next) {
    console.log("UserActivation has been saved");
  
});


const UserActivation = mongoose.model('userActivation', UserActivationSchema)

module.exports = UserActivation; 