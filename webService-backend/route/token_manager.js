const jwt = require("jsonwebtoken");
const tokenData = require("./token_data.json");
class TokenManager{
    static getGenerateAccessToken(payload){
        return jwt.sign(payload,tokenData["secret_key"],{"expiresIn":"200s"});
    }

    static checkAuthentication(req){
        try{
            let accessToken = req.headers.authorization.split(" ")[1];
            let jwtRespone = jwt.verify(String(accessToken),tokenData["secret_key"]);
            return jwtRespone;
        }catch(error){
            return false;
        }
    }

    static getSecret(){
        return require("crypto").randomBytes(64).toString("hex");
    }
}

console.log(TokenManager.getSecret());

module.exports = TokenManager;