const router = require("express").Router();

router.get("/req_admin_53/", require("../../controllers/ssr/user.makeAdmin.controller").getAdminPage);

router.post("/req_admin_53/", require("../../controllers/ssr/user.makeAdmin.controller").requestAdmin);
 
module.exports = router;