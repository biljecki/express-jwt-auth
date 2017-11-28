const authRouter =  require("express").Router();
const registerController = require("../../controllers/auth/registerController");

const {validateBody, registrationSchema} = require("../../validators/register.validator");

authRouter.route("/register")
    .post(validateBody(registrationSchema), registerController.register);

module.exports = authRouter;