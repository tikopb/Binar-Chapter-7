var express = require('express');
var home = require('./homeController');
var login = require('./login'); 
var games = require('./games')

module.exports = {
    home, login, games
}