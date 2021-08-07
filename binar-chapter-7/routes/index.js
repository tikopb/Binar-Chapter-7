var express = require('express');
var router = express.Router();

const controller = require('../controllers');

//home routing
router.get("/", controller.home.show)

module.exports = router;
