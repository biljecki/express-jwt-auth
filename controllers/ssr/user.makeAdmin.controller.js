var path = require("path");

const User = require("../../models/user");
const UserAdminRequest = require("../../models/UserAdminReq");

const randomString = require("randomstring");

const generateErrorResponse = require("../../helpers/error.helper").generateErrorResponse;

const mailer = require("../../helpers/emails/email.reqAdmin.helper");


const bcrypt = require("bcrypt");


module.exports.getAdminPage = function(req, res, next){
    res.render('requestAdmin');
}

module.exports.requestAdmin = function(req, res, next){   
    console.log("Get admin page");
    console.log("USEERR");
    console.log(req.body);

   
    const user = {
        userName: req.body.username,
        password: req.body.password
    }

    const userAdminReq = {
        "username": user.userName,
        "randomKey": randomString.generate(50)
    }

    


    console.log(" why   !!!!!");
    console.log(JSON.stringify(userAdminReq));
    
    console.log(" why   ");
    //console.log(user);

    User.findOne({ userName: user.userName }).then(function(dbUser){
        //TODO: use UserSchema static method to compare passwords       
        console.log("dbUser");

        if (dbUser==null) return res.status(401).send(generateErrorResponse(401.1, "User not found"));                        
        if (!dbUser.activated) return res.status(401).send(generateErrorResponse(405.1, "User not activated")); 

        bcrypt.compare(user.password, dbUser.password).then(function(compareResult) {
            
            if (compareResult) {
                //Save user admin request
                UserAdminRequest.create(userAdminReq).then(function(userAdminReq){
                    console.log("========================" + userAdminReq);
                    console.log("saved userAdminReq...");
                    res.send('you become admin mb');

                    console.log("asd" + JSON.stringify(userAdminReq));
                    
                    mailer.sendReqAdminMail(userAdminReq.username, null, userAdminReq.randomKey);
                    
                }).catch(next);
            }

        
            else res.status(401).send(generateErrorResponse(401.2, "Wrong password"));
        });
    }).catch(next);

    
}
