const authRoutes = require("express").Router();

authRoutes.use("/auth", require("./auth/register"));
authRoutes.use("/auth", require("./auth/login"));

module.exports = authRoutes;
