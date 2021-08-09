const router = require("express").Router()

const controllers = require("../../../controllers");
const restrict = require("../../middlewares/restrict");

router.post("/api/v2/auth/register", controllers.auth.register);
router.post("/api/v2/auth/login", controllers.auth.login);

router.post("/api/v2/auth/create-room", controllers.fight.createRoom);
router.post("/api/v2/auth/fight", controllers.fight.fighting);

module.exports = router;