const jwt=require('jsonwebtoken')
const{SECRET_KEY}=require('../utils/config')

module.exports=(req,res,next)=>{
    //get token from header
    //const token=req.header('Authorization').substring(7)
    //get token from cookies
    const token = req.cookies.token;
    //is not available
    if(!token)
    {
        return res.status(401).json("Access Denied")
    }
    try{
        // decode from token
        const decode=jwt.verify(token,SECRET_KEY)
        // get id from decode
        req.userId=decode.id
        //userid pass to next route
        next();
        
    }catch(err){
        console.log(err)
        res.json("Middleware pblm")
    }
}