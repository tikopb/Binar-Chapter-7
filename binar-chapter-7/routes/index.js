var express = require('express');
var router = express.Router();
const navigationRouter = require("./router");
const apiV2Post = require("./api/v2/get");
const apiV2Get = require("./api/v2/post");

router.use(navigationRouter);
router.use(apiV2Get);
router.use(apiV2Post);

module.exports = router;
