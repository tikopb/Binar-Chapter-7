module.exports ={
    show: (req,res)=>{
        const name = req.query.name
        const id = req.query.id 
        const room = 0
        res.render('games', {
            name,
            id,
            room
        }) 
    }
}