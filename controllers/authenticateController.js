const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.authenticate = function(req, res, next){
    
    const clientUser = {
        userName: req.body.user.userName,
        password: req.body.user.password,
        email: req.body.user.email || null
    }

    //if registering, create new user...
    if (req.body.user.registering === true){
           User.create(clientUser).then(function(user){
                res.send(userToken());
           }).catch(next);
    }
    //...otherwise log in...
    else{
        User.findOne({ userName: clientUser.userName }).then(function(dbUser){
            //TODO: use UserSchema static method to compare passwords
            bcrypt.compare(clientUser.password, dbUser.password).then(function(compareResult) {
                if (compareResult) res.send(userToken());
                else res.send("PASSWORD FAIL");
            });
        }).catch(next);
    } 

    //this function generates response data, combining user data and token
    //TODO: add isRegistering bool here, in case client needs it, also pass data which you want in response from callers
   function userToken(){
        delete clientUser.password;    
        var token = jwt.sign(clientUser, process.env.JWT_SECRET_KEY, {
            expiresIn: 400000
        });
        return {success:true, clientUser, token};
    }
   
}



