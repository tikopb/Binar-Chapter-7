let { user_game, user_game_biodata, user_game_fights, user_game_history} = require('../models')

function GetRandom6DigitNumber(){
    return Math.floor(100000 + Math.random() * 900000);
}

async function CreateRoom(user_game_id,tokenNumber, rounde, plyChoose){
    if(rounde > 3 ){
        Promise.reject('already 3 row please wait player 2 to join! and finish the game')
    }
    const data = await user_game_fights.create({
        ply_1_id: user_game_id,
        ply_1_choose: plyChoose,
        roomNumber: tokenNumber,
        rounde: rounde
    })
    if(data == null){
        Promise.reject("erorr to cretea Room")
    }
    return Promise.resolve(data)
}

async function GetRoom (){
    const room = await user_game_fights.findOne({where: {roomNumber: req.body.roomNumber}})
    if(room == null){
        res.status(500).json({
            msg: `room ${req.body.roomNumber} is not found please register the room first!!!`
        })
    }
    return Promise.resolve(data)
}

async function RoomValidation(roomNumber, user_Id){
    const data = await user_game_fights.count({
        where:{
            'roomNumber': roomNumber,
            'winner_user_id': null,
            $or: [
                {
                    ply_1_id: user_Id
                },
                {
                    ply_2_id: user_Id
                }
            ]
        }
    })
    if(data == null){
        Promise.reject("erorr to count Room || room not found")
    }
    return Promise.resolve(data)
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

async function getWinnerBaseOnCount(p1_id, p2_id, roomNumber){
    const returnValue = 0;
    const p1WinCount = await user_game_fights.count({
        winner_user_id: p1_id,
        roomNumber: roomNumber
    })
    const p2WinCount = await user_game_fights.count({
        winner_user_id: p2_id,
        roomNumber: roomNumber
    })
    
    if(p1WinCount > p2WinCount){
        returnValue = p1_id
    }else{
        returnValue = p2_id
    }
    if(returnValue = 0 ){
        return Promise.reject(`data is empty !!`)
    }
    return Promise.resolve(returnValue)
}

async function CreateGameHistory(userId, roomNumber){
    const data =  await user_game_history.create({
        user_id: userId,
        score: 10,
        roomNumber: roomNumber
    })
    if(data == null){
        Promise.reject("erorr to create history of game")
    } 
    return Promise.resolve(data)
}

module.exports ={
    createRoom: async function(req,res) {
        let dataUser = await user_game.authenticate(req.body)
        let token = GetRandom6DigitNumber()
        let fightRoom = await CreateRoom(dataUser.get('id'), token, 1, null)
        res.status(200).json({
            "room request": `Your room is ${fightRoom.get('roomNumber')}`
        })
    },
    fighting: async function(req,res){ 
        let dataUser = await user_game.authenticate(req.body)
        
        //check the room
        let room = await user_game_fights.findOne({where: {roomNumber: req.body.roomNumber}})
        if(room == null){
            res.status(500).json({
                msg: `room ${req.body.roomNumber} is not found please register the room first!!!`
            })
        }
    
        //count if room already 3 data where ply 1 id and ply 2 id is not null then return room is done 
        const rounde  = await RoomValidation(room.get('roomNumber'))
        if(rounde === 3 ){
            res.status(400).json({
                msg: `room ${req.body.roomNumber} already over for you turn please run result to get the winner!!!`
            })
        }
        
        //id dataUser.ply_2 is null && and ply 1 == ply_1 then update
        if(room.get('ply_1_id') === dataUser.get('id')){
            CreateRoom(dataUser.get('id'),room.get('roomNumber'), rounde+1, req.body.plyChoose)
            res.status(200).json({
                msg: 'fight data already input'
            })
            
        }
        else if(room.get('ply_2_id') === null || room.get('ply_2_id') == dataUser.get('id')){
            if(room.get('ply_1_id') === null){
                res.status(500).json({
                    msg: 'player 1 not choose yet please wait and try again'
                })
            }
            else{
                await room.update({
                    ply_2_id: dataUser.get('id'),
                    ply_2_choose: req.body.plyChoose
                })
                const winnerId = WinnerCheck(p1Choose, p2Choose, p1_id, p2_id)
                await room.update({
                    winner_user_id: winnerId
                })
                
                if(room.get('roomNumber') === 3 ){
                    const winnerOfRoom = await getWinnerBaseOnCount(room.get('ply_1_id'), room.get('ply_2_id'), room.get('roomNumber'))
                    CreateGameHistory(winnerOfRoom, room.get('roomNumber'))
                }
                
            }
        }
        else{
            res.status(500).json({
                msg : `room is full !!`
            })
        }
    },
    result: async (req,res) => {
        const history  = await user_game_history.findOne({
            where:{
                roomNumber: req.body.roomNumber
            }
        })
        const user = await user_game.findOne({
            where:{
                id: history.get('user_id')
            }
        })
        res.send(200).json({
            msg: `the winner of room ${history.get('roomNumber')} is ${user.get('username')}`
        })
    }
}