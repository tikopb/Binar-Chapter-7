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
        .then(user_game => {
            res.json({
                "value": "Register berhasil, silahkan login"
            })
        })
        .catch((err) => next(
            res.json({
                "value": "Periksa kembali data data login anda"
            })
        ));
    },
    login: (req, res) => {
        user_game.authenticate(req.body)
            .then(user_game => {
                res.json(
                    format(user_game)
                )
            })
            .catch( (err)=> next(
                res.json({
                    "value": "User Not Found"
                })
            ));
    },
    whoami: (req, res) => {
        const currentUser = req.user;
        res.json(currentUser);
    }
}
