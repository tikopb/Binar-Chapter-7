var express = require('express');
var router = require('express').Router();
const controller = require('../controllers');

//class ini digunakan sebagai routing get pada aplikasi 
//login page 
router.post("/login", controller.login.loginProcess)
router.post("/register", controller.games.registerProcess)

// //dashboard page
// router.post("/dashboard-edit-save", controller.dashboard.dashboardEdit)

module.exports = router;