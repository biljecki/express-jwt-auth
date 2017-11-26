const router = require("express").Router();

router.post("/pro", function(req, res){
    res.status(200).send("{VALID TOKEN AND IN PROTECTED ROUTE}");
});

module.exports = router;