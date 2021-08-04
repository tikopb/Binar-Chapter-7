let { user_game, user_game_biodata, user } = require('../models')

module.exports ={
    showLogin: (req,res)=>{
        res.render('login'); 
    },
    showRegister: (req,res)=>{
        res.render('register',{
            erorrMsg: ''
        }); 
    },  
    loginProcess: (req, res)=>{
        const {username, password} = req.body
        user_game.findOne({
            where: {
                username: username,
                password: password,
                isactive: true            
            }
        }).then((data) => {
            if(user_game.length !== null && user_game.isAdmin === true){
                res.redirect(`/dashboard?name=${data.get('username')}&id=${data.get('id')}`)  
            }else if(user_game.length !== null && user_game.isAdmin === false){
                res.redirect(`/games?name=${data.get('username')}&id=${data.get('id')}`) 
            }else{
                console.log('username Or Password is Wrong')
                res.render('login',{
                    erorrMsg: 'username Or Password is Wrong'
                })
            }
        })
    },
    registerProcess: async (req, res)=>{
        const {username, front_name, last_name, age, email,password} = req.body 
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
                user_game.create({
                    username: username,
                    password: password,
                    email: email
                })
                .then(user_game => {
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