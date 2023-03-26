const TokenManager = require("../route/token_manager");

let user = [
    {id:"1",username : "thewin",lname :"zaza",password:"555",tel:"888-888" },
    {id:"2",username : "test",lname :"lnw",password:"123",tel:"333-333" }
];

exports.LoginUser = (req,res,next) => {
   
        const {username,password} = req.body;
        let userData = {username,password};
        console.log("USER INFO : ",userData);
        let userLoginData = user.find((value)=>{return (value.username==userData.username&&value.password==userData.password)});
        if(userLoginData==undefined){
            res.send(JSON.stringify({status:"0"}));
            console.warn(userLoginData);
        }else{
            let accessToken = TokenManager.getGenerateAccessToken({"id":userLoginData.id});
            res.send(JSON.stringify({status:"1","access_token":accessToken}));
        }
}

exports.CheckToken = (req,res,next) => {

    let jwtStatus = TokenManager.checkAuthentication(req);
    if(jwtStatus!=false){
        res.send(jwtStatus);
    }else{
        res.send(false);
    }

}
exports.GetDataUser = (req,res,next) =>{

    let jwtStatus = TokenManager.checkAuthentication(req);
    if(jwtStatus!=false){
        res.send(user.find((value)=>{return(value.id == jwtStatus.id)}));
    }else{
        res.send(false);
    }   
    
}