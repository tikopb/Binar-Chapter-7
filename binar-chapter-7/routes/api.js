var express = require('express');
var router = express();
const controller = require('../controllers');

router.use(express.Router());

//class ini digunakan sebagai routing get pada aplikasi 
//login page 
router.post("/login", controller.login.loginProcess);

//register page 
router.post("/register", controller.register.registerProcess)

// //dashboard page
router.post("/dashboard-edit-save", controller.dashboard.dashboardEditSave)

module.exports = router;