const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authorize = function(req, res, next){
    
    var token = req.get("authorization").split(" ").pop();
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decodedUser){
        if (err){
            console.log("HERE INVALID")
            res.status(500).send("INVALID TOKEN IDIOT");                        
        } else {
            req.user = decodedUser;
            next();
        }
    })
   
}


