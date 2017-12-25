const usrMgtRoutes = require("express").Router();

//activate user
usrMgtRoutes.use("/usrmgt", require("./ssr/user.activate"));

//user requests to be admin
usrMgtRoutes.use("/usrmgt", require("./ssr/user.makeAdmin"));

//user requests to be admin
usrMgtRoutes.use("/usrmgt", require("./ssr/user.approveAdmin"));

module.exports = usrMgtRoutes;
