let { user_game, user_game_biodata, user } = require('../models')

module.exports ={
    index: (req,res)=>{
        res.render('login'); 
    },
    loginProcess: (req, res, next)=>{
        const {username, password} = req.body
        user_game.findOne({
            where: {
                username: username,
                password: password,
                isactive: true            
            }
        }).then((data) => {
            if(user_game.length !== null && data.get('isAdmin')){
                res.redirect(`/dashboard?name=${data.get('username')}&id=${data.get('id')}`)  
            }else if(user_game.length !== null && !data.get('isAdmin')){
                res.redirect(`/games?name=${data.get('username')}&id=${data.get('id')}`) 
            }else{
                console.log('username Or Password is Wrong')
                res.render('login',{
                    erorrMsg: 'username Or Password is Wrong'
                })
            }
        })
    }
}