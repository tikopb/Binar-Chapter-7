const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { user_game } = require('../models')

//paspoort with jwt version
const options = { 
    // untuk ekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    
    // secret key harus sama dengan yang ada di model pada tabel yang dituju untuk melakukan process login!
    secretOrKey: "binarWave10",
}

passport.use(new JwtStrategy(options, async (payload, done) => { 
    // payload adalah hasil terjemahan JwtStrategy, sesuai dengan apa yang kita masukkan di parameter pertama dari jwtFromRequest.sign
    user_game.findByPk(payload.id)
        .then(user => done(null.user))
        .then(err => done (err, false))
}))

module.exports = passport