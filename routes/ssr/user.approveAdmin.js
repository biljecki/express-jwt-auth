const router = require("express").Router();

router.get("/approve_admin/:token", require("../../controllers/ssr/user.approveAdmin.controller").approveAdmin);


 
module.exports = router;