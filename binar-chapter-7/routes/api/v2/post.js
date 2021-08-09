const router = require("express").Router()

const controllers = require("../../../controllers");
const restrict = require("../../middlewares/restrict");

router.post("/api/v2/auth/register", controllers.auth.register);
router.post("/api/v2/auth/login", controllers.auth.login);

router.get("/api/v2/auth/whoami", restrict, controllers.auth.whoami);

module.exports = router;