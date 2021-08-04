var express = require('express');
var router = express.Router();
const controller = require('../controllers');

//class ini digunakan sebagai routing get pada aplikasi 
//home routing
router.get("/", controller.home.show)

//login routing
router.get("/login", controller.login.showLogin)
router.get("/register", controller.login.showRegister)


//games routing 
router.get("/games", controller.games.show)

//dashboard page
router.get('/dashboard-delete', controller.dashboard.dashboardDelete)

module.exports = router;
