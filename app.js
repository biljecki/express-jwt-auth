const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const expHbs  = require('express-handlebars');

const app = express();

//for server side pages whose functionality is outside the SPA
app.engine('handlebars', expHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

process.env.JWT_SECRET_KEY = "teamplayer:NO";

mongoose.connect("mongodb://localhost/cc_sports");
mongoose.promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use all routes from routes.js
app.use(require("./routes/auth-routes"));
//app.use(require("./routes/base-route"));
app.use(require("./routes/api-routes"));

//user specific routes - server side rendered
app.use(require("./routes/usrmgt.routes"));

//error middleware
app.use(function(err, req, res, next){res.status(422).send(require("./helpers/error.helper").generateErrorResponse(err.code, err.message));});

//listen for requests on port (read this from .env file (.env.PORT || 4400))
app.listen(4400, function(){
    console.log("\n\n\n\n\n\n\n\nSERVER STARTED: LISTENING FOR REQUESTS...");
});