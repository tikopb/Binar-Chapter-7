module.exports ={
    showLogin: (req,res)=>{
        res.render('login'); 
    },
    showRegister: (req,res)=>{
        res.render('register',{
            erorrMsg: ''
        }); 
    },
}