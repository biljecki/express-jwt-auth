const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const generateErrorResponse = require("../../helpers/error.helper").generateErrorResponse;


module.exports.register = function(req, res, next){
    
    const user = {
        userName: req.body.user.userName,
        password: req.body.user.password,
        email: req.body.user.email
    }

    //create new user
    User.create(user, function(err){
        console.log(err);
        res.send(generateErrorResponse(401.3, err.errmsg))
        
     }).then(function(user){
        res.send(userToken());
    }).catch(next);
    
    
    function userToken(){
        delete user.password;    
        var token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: 400000
        });
        return {success:true, user, token};
    }
   
}
