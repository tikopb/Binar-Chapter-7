let { user_game, user_game_biodata, user_game_fights } = require('../models')

function GetRandom6DigitNumber(){
    return Math.floor(100000 + Math.random() * 900000);
}

function GetUserName(user_id){
    user_game.findOne({
        where: {
            id: user_id,
            isactive: true            
        }
    }).then(user_game => {
        return user_game.get('username')
    })
}

function WinnerCheck(p1Choose, p2Choose, p1_id, p2_id) {
    let winnerId = 0;
    if(p1Choose === p2Choose){
        return "0"
    }
    else if (p1Choose === 'R'){ //1 
        if(p2Choose === 'P'){
            winnerId = p2_id
        }
    }
    else if (p1Choose === 'P'){
        if(p2Choose === 'S'){
            winnerId = p1_id
        }   
    }
    else if (p1Choose === 'S'){
        if(p2Choose === 'S'){
            winnerId = p2_id
        }        
    }
    return winnerId
}

function GetRoom(roomNumber) { 
    return new Promise((resolve,reject) => { 
        user_game_fights.max('rounde', {
            where: {
                roomNumber: roomNumber,
                ply1_id: null        
            }.then(room => {
                resolve(room)
            })
            .catch( (err)=> next(
                reject(`failed Get ${roomNumber} is not found`)
            ))
        })
    })   
}

async function CreateRoom(user_game_id,tokenNumber, rounde, plyChoose){
    var returnValue =  await user_game_fights.create({
        ply1_id: user_game_id,
        ply_1_choose: plyChoose,
        roomNumber: tokenNumber,
        rounde: rounde
    })
    //console.log(returnValue)
    return returnValue
}

async function main(){
    
}

module.exports ={
    createRoom: (req,res, next) => {
        user_game.authenticate(req.body)
        .then(user_game => {
            const token = GetRandom6DigitNumber()
            // user_game_fights.create({
            //     ply1_id: user_game.get('id'),
            //     roomNumber: token,
            //     rounde: 0
            var fightRoom = CreateRoom(user_game.get('id', token, 0, null))
            console.log(fightRoom)
            // .then(roomNew => {
            //     console.log(roomNew)
            //     const room = user_game_fights.get('roomNumber')
            //     res.status(200).json({
            //         "roomNumber": `Room anda adalah ${room}`
            //     })
            // })
        })
        .catch( (err)=> next(
            res.status(500).json({
                "erorrMSg": `failed ${err}`
            })
        ))
    },
    fighting: (req,res, next) => {
        const{ roomNumber, plyChoose} = req.body;
        user_game.authenticate(req.body)
        .then(user_game => {
            GetRoom(roomNumber)
            .then(room=> {  
                if(room.get('rounde') === 3 && room.get('ply_2_id') === null){
                    throw(`already 3 match on this room: ${room.get('rounde')} and the winner is= ${GetUserName(room.get('winner_user_id'))}`)
                } 
                if(room.get('ply_1_id') === null){
                    room.update({
                        ply1_id: user_game.get('id'),
                        ply_1_choose: plyChoose
                    })
                }else if(room.get('ply_1_id') !== null){
                    room.update({
                        ply2_id: user_game.get('id'),
                        ply_2_choose: plyChoose
                    }).then(room => {
                        const winnerId = WinnerCheck(room.get('ply_1_choose'), room.get('ply_2_choose'))
                        room.update({
                            winner_user_id: winnerId
                        }).then(data => {
                            res.status(200).json({
                                "winner": `The Winner is ${GetUserName(data.get('winner_user_id'))}`
                            })
                        })
                    })
                }else{
                    let roomNumber = room.get('rounde') 
                    CreateRoom(user_game_id,tokenNumber, roomNumber + 1, plyChoose)
                }
            })
        })
        .catch( (err) => next(
            res.status(500).json({
                "erorrMSg": `failed TO : ${err}`
            })
        ))
    }
}