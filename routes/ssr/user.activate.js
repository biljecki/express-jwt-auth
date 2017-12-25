const router = require("express").Router();

router.get("/activate/:token", require("../../controllers/ssr/user.activate.controller").activateUser)

module.exports = router;