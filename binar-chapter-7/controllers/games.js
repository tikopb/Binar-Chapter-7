module.exports ={
    show: (req,res)=>{
        const name = req.query.name || 'PLAYER 1'
        res.render('games', {
            name
        }) 
    }
}