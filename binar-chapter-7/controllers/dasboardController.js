let { user_game, user_game_biodata } = require('../models')

module.exports ={
    index: (req,res) => { 
        user_game.findAll({
            where:{
                isactive: true,
                isAdmin: false
            }
        })
        .then(user_game =>{
            res.render("dashboard",{
                name: req.query.name,
                user_game
            });
        })
    },
    dashboardEdit: (req,res, next)=>{
        const {username, email} = req.body
        user_game.findOne({
            where: {
                id: req.query.id
            }
        }).then((user_game) => {
            user_game.update({
                username: username,
                email: email
            }).then(() => {
                res.redirect(`/dashboard`)
            })
        })
    },
    dashboardDelete: (req, res)=>{
        let user_id = req.params.id
        user_game.findOne({
            where: {
                id: req.query.id
            }
        }).then((user_game) => {
            user_game.destroy({
                where: { 
                    id: user_id 
                }
            }).then(() => {
                res.redirect(`/dashboard`)
            })
        })  
    }
}