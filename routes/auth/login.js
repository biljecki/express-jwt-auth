const authRouter =  require("express").Router();
const loginController = require("../../controllers/auth/loginController");
const {validateLogin, loginSchema} = require("../../validators/login.validator");
   
authRouter.route("/login")
    .post(validateLogin(loginSchema), loginController.login);

module.exports = authRouter;