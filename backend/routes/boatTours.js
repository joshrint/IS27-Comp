var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("Boat API working properly");
});

module.exports = router;