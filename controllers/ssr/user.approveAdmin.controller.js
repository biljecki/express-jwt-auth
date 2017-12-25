const User = require("../../models/user");
const UserAdminReq = require("../../models/UserAdminReq");

module.exports.approveAdmin = function(req, res, next){
    console.log("UserActivationController")
    
    //create new user
    UserAdminReq.findOneAndRemove({ "randomKey" : req.params.token }).then(function(removedUserAdminReq){
        console.log("deleted activation..." + removedUserAdminReq);
        if (removedUserAdminReq!=null){           
            User.findOneAndUpdate({userName: removedUserAdminReq.username },{isAdmin: true}, {new: true})
            .then(function(adminatedUser){
                console.log("adminated " + JSON.stringify(adminatedUser));
                res.send('adminated ' + adminatedUser.userName);            
            }).catch(next);
        }
        else res.send('not found');
    }).catch(next);   
}