var express = require('express');
var router = express.Router();

const controller = require('../controllers');

//home routing
router.get("/", controller.home.show)

//login routing
router.get("/login", controller.login.showLogin)
router.get("/register", controller.login.showRegister)

//games routing

module.exports = router;
