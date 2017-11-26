const authRoutes = require("express").Router();

authRoutes.use("/auth", require("./auth/auth")); 

module.exports = authRoutes;
