const jwt=require('jsonwebtoken')
const{SECRET_KEY}=require('../utils/config')

module.exports=(req,res,next)=>{
    //get token from header
    const token=req.header('Authorization')
    console.log({token:"token"})
    if(!token)
    {
        return res.status(401).json("Access Denied")
    }
    try{
    const decode=jwt.verify(token,SECRET_KEY)
        req.userId=decode.userId
        next();
    }catch(err){
        console.log(err)
        res.json("Middleware pblm")
    }
}