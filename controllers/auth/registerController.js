const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");

const User = require("../../models/user");
const UserActivation = require("../../models/UserActivation");
const generateErrorResponse = require("../../helpers/error.helper").generateErrorResponse;
const mailer = require("../../helpers/email.register.helper");

const mongooseUniqueError = require("../../helpers/errors/mongoose.unique.error");

module.exports.register = function(req, res, next){
    console.log("RegisterController")
    
    const user = {
        userName: req.body.user.userName,
        password: req.body.user.password,
        email: req.body.user.email
    }

    const userActivation = {
        "username": user.userName,
        "randomKey": randomString.generate(50)
    }

    console.log("----" + JSON.stringify(userActivation));
    
    //create new user
    User.create(user, function (err) {
        if (err!=null) {
            console.log("USER CREATE ERROR:\n" + JSON.stringify(err));        
            res.status(401).send(mongooseUniqueError.generateErrorResponse(err)); 
        }
    }).then(function(savedUser){  
        UserActivation.create(userActivation).then(function(userActivation){
            console.log("========================" + userActivation);
            console.log("saved userACTIVATION...");

            //NULL PARAMETER IS EMAIL ADDRESS - FOR DEV ALL EMAILS WILL BE SENT TO MEEEEEE
            mailer.sendRegistrationMail(savedUser.userName, null, userActivation.randomKey);
            res.send(userToken(savedUser));       
        }).catch(next);
    }).catch(next);

    

    function userToken(savedUser){
        delete savedUser.password;   
        var user = {            
            username: savedUser.userName,
            email: savedUser.email,
            activated: savedUser.activated         
        }
        var token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: 400000
        });
        console.log("sending response...")
        return {success:true, user, token};
    }
   
}
