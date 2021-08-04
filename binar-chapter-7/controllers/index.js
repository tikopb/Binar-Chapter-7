var express = require('express');
var home = require('./homeController');
var login = require('./loginContoller'); 
var games = require('./games');
var dashboard = require('./dasboardController');

module.exports = {
    home, login, games, dashboard
}