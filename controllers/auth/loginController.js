const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const generateErrorResponse = require("../../helpers/error.helper").generateErrorResponse;

module.exports.login = function(req, res, next){
    
    const clientUser = {
        userName: req.body.user.userName,
        password: req.body.user.password
    }

    User.findOne({ userName: clientUser.userName }).then(function(dbUser){
        //TODO: use UserSchema static method to compare passwords       

        if (dbUser==null) return res.status(401).send(generateErrorResponse(401.1, "User not found"));
        bcrypt.compare(clientUser.password, dbUser.password).then(function(compareResult) {
            if (compareResult) {
                res.send(userToken(dbUser));
            }
            else res.status(401).send(generateErrorResponse(401.2, "Wrong password"));
        });
    }).catch(next);
    
    //this function generates response data, combining user data and token
    function userToken(dbUser){
        var user = {            
            username: dbUser.userName,
            email: dbUser.email,
            activated: dbUser.activated         
        }
        
        if (dbUser.isAdmin) user.isAdmin = true;

        var token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: 400000
        });
        return {success:true, user, token};
    }
   
}
