const authRouter =  require("express").Router();

const authenticateController = require("../../controllers/authenticateController");
authRouter.post("/", authenticateController.authenticate);

module.exports = authRouter;