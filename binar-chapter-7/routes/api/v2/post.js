const router = require("express").Router()

const controllers = require("../../../controllers");
const restrict = require("../../middlewares/restrict");

//login and register
router.post("/api/v2/auth/register", controllers.auth.register);
router.post("/api/v2/auth/login", restrict, controllers.auth.login);

//room fight
router.post("/api/v2/auth/create-room", restrict, controllers.fight.createRoom);
router.post("/api/v2/auth/fighting", controllers.fight.fighting);

module.exports = router;