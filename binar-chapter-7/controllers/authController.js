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
            res.status(200).json({
                "acceccssToken": user_game.generateToken(),
                "value": "Register berhasil, silahkan login"
            })
        })
        .catch((err) => next(
            res.status(500).json({
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
                res.status(500).json({
                    "value": "User Not Found"
                })
            ));
    },
    whoami: (req, res) => {
        const currentUser = req.user;
        res.json(currentUser);
    }
}
