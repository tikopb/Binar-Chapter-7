var express = require('express');
var router = express.Router();
const controller = require('../controllers');

//get function
//home routing
router.get("/", controller.home.show)
//login routing
router.get("/login", controller.login.index)
router.get("/register", controller.register.index)
//games routing 
router.get("/games", controller.games.show)
//dashboard page
router.get("/dashboard", controller.dashboard.index)
router.get("/dashboard-edit", controller.dashboard.dashboardEdit)
router.get('/dashboard-delete', controller.dashboard.dashboardDelete)

// ======= post function
//login page 
router.post("/login", controller.login.loginProcess);
//register page 
router.post("/register", controller.register.registerProcess)
// //dashboard page
router.post("/dashboard-edit-save", controller.dashboard.dashboardEditSave)

module.exports = router;