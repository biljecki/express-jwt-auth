var path = require("path");

const User = require("../../models/user");
const UserActivation = require("../../models/UserActivation");

module.exports.activateUser = function(req, res, next){
    console.log("UserActivationController")
    
    //create new user
    UserActivation.findOneAndRemove({ "randomKey" : req.params.token }).then(function(removedActivation){
        console.log("deleted activation..." + removedActivation)
        if (removedActivation!=null){
            User.findOneAndUpdate({userName: removedActivation.username },{activated: true}, {new: true})
            .then(function(activatedUser){
                console.log("ACTIVATED " + JSON.stringify(activatedUser));
                res.render('activated');            
            }).catch(next);
        }
        else res.render('activatedAlready');
    }).catch(next);   
}