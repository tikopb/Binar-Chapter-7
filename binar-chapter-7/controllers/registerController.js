let { user_game, user_game_biodata, user } = require('../models')

module.exports ={
    index: (req,res)=>{
        res.render('register',{ 
            erorrMsg: ''
        }); 
    },
    registerProcess: async (req, res, next)=>{
        const {username, front_name, last_name, age, email,password, isAdmin} = req.body 
        user_game.findAll({
            where: {
                username: username
            }
        }).then(function (usernameExist){
            console.log(usernameExist)
            if(usernameExist.length > 0){
                console.log('username already exist!')
                res.render('register',{
                    erorrMsg: 'Username Already Exist'
                })
            }else{
                user_game.register({
                    username: username, 
                    password: password,
                    isAdmin: isAdmin, 
                    email:email
                }).then(user_game => {
                    user_game_biodata.create({
                        front_name: front_name,
                        last_name: last_name,
                        age: age,
                        user_id: user_game.get('id')
                    })
                })
                res.render('login')
            }
        })
    }
}