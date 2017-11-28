const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

//TODO: add validation, also for email to be valid only for specified domains (read this from .env)
const UserSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    activated: {
        type: Boolean,
        default: true,
    }

});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // hash the password
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });

});

//TODO: not in use atm, doesnt work -> take a look at authenticateController.js/authenticate/bcrypt.compare
UserSchema.statics.comparePassword = function(clientPassword, dbPassword, cb) {    
    bcrypt.compare(clientPassword, dbPassword, function(err, isMatch) {
        if (err) return cb(err);
        isMatch();
    });
};

const User = mongoose.model('user', UserSchema)

module.exports = User;