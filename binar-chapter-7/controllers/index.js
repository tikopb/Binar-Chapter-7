//var express = require('express');
var home = require('./homeController');
var login = require('./loginContoller'); 
var games = require('./gamesController');
var dashboard = require('./dasboardController');
var register = require('./registerController');
var auth = require('./authController');
var fight = require('./fightController')

module.exports = {
    home, login, games, dashboard, register, auth, fight
}