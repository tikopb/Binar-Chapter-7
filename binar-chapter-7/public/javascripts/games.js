//difine masterVariabel
var comChoose = null;
var plyChoose = null;
const player1VariabelIdList = ["batu1", "kertas1", "gunting1"];
const comVariabelIdList = ["batu2", "kertas2", "gunting2"];
const batuPlayer = document.getElementById("batu1").onclick = ()=> batuAction()
const kertasPlayer = document.getElementById("kertas1").onclick = kertasAction
const guntingPlayer = document.getElementById("gunting1").onclick = guntingAction

const imagePath = "images/"
const winImagePath = "/player1.png"
const loseImagePath = "/comWin.png"
var resultImg = document.getElementById("result")
var id = document.getElementById("userId").value;

//main function 

class UserPlayer{ 
    constructor(id){
        this.userId = id;
    }
    
}

class gameStart {
    constructor(ply){
        this.ply = ply;
    }
    
    play(){
        if(plyChoose!=null){
            return alert("To Play again press refresh button!")
        }else {
            plyChoose = this.ply
            this.getRandomMathOfCom()
        }
    }
    
    getRandomMathOfCom(){ // generate what com player choose on random math
        comChoose = Math.floor(Math.random() * 3)  ;  
        this.validationOfTheWinner()
    }
    
    validationOfTheWinner(){
        let ply = parseInt(this.ply)
        let com = parseInt(comChoose)
        console.log(ply + "  || " + com )
        if(ply == com){
            resultImg.src = imagePath+"/draw.png"
        }else if (ply == 0){
            if(com==1){
                resultImg.src = imagePath+loseImagePath
            }else{
                resultImg.src = imagePath+winImagePath
            }
        }
        else if (ply == 1){
            if(com==2){
                resultImg.src = imagePath+loseImagePath
            }else{
                resultImg.src = imagePath+winImagePath
            }
        }
        else if (ply == 2){
            if(com==0){
                resultImg.src = imagePath+loseImagePath
            }else{
                resultImg.src = imagePath+winImagePath
            }
        } 
        
        this.SetColorBackgroundPly()
        this.SetColorBackgroundCom()
    }
        
    SetColorBackgroundCom(){
        let computerChoose = comVariabelIdList[comChoose];
        console.log(computerChoose+" com")
        document.getElementById(computerChoose).style.background='#808080'
    }

    SetColorBackgroundPly(){
        let playerChoose = player1VariabelIdList[this.ply];
        console.log(playerChoose+" ply")
        document.getElementById(playerChoose).style.background='#808080';
    }
    
}


function batuAction(id){ 
    let playGame = new gameStart(0)
    playGame.play()
}

function kertasAction(){ 
    let playGame = new gameStart(1)
    playGame.play()
}

function guntingAction(){ 
    let playGame = new gameStart(2)
    playGame.play()
}