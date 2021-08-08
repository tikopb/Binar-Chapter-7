const router = require("express").Router()

const controllers = require("../../../controllers");

router.post("/api/v2/auth/login", controllers.auth.login);

module.exports = router;