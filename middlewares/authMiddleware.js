const jwt = require("jsonwebtoken")

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).json({
            error:"Token is invalid"
        })
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({
                error:"User not logged in"
            })
        }
        req.user = user
        next();
    })
    
}

module.exports = {
    authenticateToken
}