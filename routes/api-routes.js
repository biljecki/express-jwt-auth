const apiRoutes = require("express").Router();
const jwt = require("jsonwebtoken");

const apiProtectController = require("../controllers/protected/api.protected");

apiRoutes.use("/api/", apiProtectController.authorize);

apiRoutes.use("/api/", require("./api/pro")); 
module.exports = apiRoutes;
