const jwt=require('jsonwebtoken')
const{SECRET_KEY}=require('../utils/config')

module.exports=(req,res,next)=>{
    //get token from header
    const token=req.header('Authorization').substring(7)

    if(!token)
    {
        return res.status(401).json("Access Denied")
    }
    try{
    const decode=jwt.verify(token,SECRET_KEY)
        req.userId=decode.id
        console.log(req.userId)
        next();
        
    }catch(err){
        console.log(err)
        res.json("Middleware pblm")
    }
}