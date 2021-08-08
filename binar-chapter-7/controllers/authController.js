let { user_game } = require('../models')
const passport = require("../lib/passport")

function format(user_game){
    const { id, username } = user_game
    return{ 
        id,
        username,
        accessToken: user_game.generateToken()
    }
}

module.exports = { 
    register: (req, res, next) => {
        user_game.register(req.body)
        .then(() => {
            res.redirect("/login");
        })
        .catch((err) => next(err));
    },
    login: (req, res) => {
        user_game.authenticate(req.body)
            .then(user_game => {
                res.json(
                    format(user_game)
                )
            })
    },
    whoami: (req, res) => {
        const currentUser = req.user;
        res.json(currentUser);
    }
}
