var express = require('express');
var router = express.Router();

const controllers = require("../../../controllers");
const restrict = require("../../middlewares/restrict");

router.get("/api/v2/auth/whoami", restrict, controllers.auth.whoami)


module.exports = router;