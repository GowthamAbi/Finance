const User = require("../models/User");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {SECRET_KEY}=require('../utils/config');
const { token } = require("morgan");
const userControllers = {
  dashboard: async (req, res) => {
    try {
                    // Disable caching for this route
                    res.setHeader('Cache-Control', 'no-store');

                    // get the userId from the request object
                    const { userId } = req;
        
                    // get the user details from the database
                    const user = await User.findById(userId).select('-password -__v');
                    res.json(user)
                    //res.json({ message: "Successfully Enter Dashboard" });

    } catch (err) {
      console.log(err)
      res.status(400).json({ message: "Dashboard Not Work" });
    }
  },
  register:async (req, res) => {
    try {
      // Content get from user
      const {name,email,password,phone}=req.body;
      // Check is have in DB
      const userExists=await User.findOne({email})
      // already have return
      if(userExists)
      {
        res.json("Allready Register")
      }
      //encrypt the password
      const hashPassword=await bcrypt.hash(password,10)
      // create new user
      const newUser= await User.create({name,email,password:hashPassword,phone})
      //save to db
      await newUser.save();
      // retun response
      res.json({ message: "Successfully Registered" }); 

    
    } catch (err) {
      //incase any error just throw that error
      console.log(err)
      res.status(400).json({ message: "Registration site Not Work" });
    }
  },
  login:async (req, res) => {
    try {
       // Content get from user
      const {email,password}=req.body;
      
       // Check is have in DB
      const user=await User.findOne({email})
      // incase non it return to register
      if(!user)
      {
        return res.json("Must Be Register")
      }
     // compare encrypt password to user give password
     const isPassword=await bcrypt.compare(password,user.password)
     //is not match
     if(!isPassword)
     {
      return res.status(400).json("Password not vaild");
     }
     
     //create token
     const token=await jwt.sign({id:user._id},SECRET_KEY,{ expiresIn: "1h" })
      // set the token in the cookie

     res.cookie("token", token, {
      httpOnly: true,
      secure: true,  // Ensure HTTPS
      sameSite: "None",
      path: "/",
  });

      res.json({ message: "Successfully login",token:token }); 

    } catch (err) {
      console.log(err)
      res.status(400).json({ message: "Login Not Work" });
    }
  },
 logout: (req, res) => {
    try {
         // clear the token from the cookie
         res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          path: "/"
      });
           
      res.json({ message: "Successfully Logout" }); 
    } catch (err) {
      res.status(400).json({ message: "Logout Not Work" });
    }
  },
};token

module.exports = userControllers;
