const apiRoutes = require("express").Router();
const jwt = require("jsonwebtoken");

apiRoutes.use("/api/", function(req, res, next){

    //REMOVE QUERY TOKEN WHEN FINISH THIS THING OK???? YOU DONT WANT TO PASS TOKEN THRU URL RETARD...
    //TODO: PASS TOKEN THRU AUTH HEADER, REMOVE BODY AND HEADER
    //TODO: move this logic to protect controller
    var token = req.body.token || req.headers['token'] || req.query.token;
    jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
        if (err){
            res.status(500).send("INVALID TOKEN IDIOT");                        
        } else {
            req.user = decode;
            next();
        }
    })
});

apiRoutes.use("/api/", require("./api/pro")); 
module.exports = apiRoutes;
