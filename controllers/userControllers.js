const User = require("../models/User");
const bcrypt=require('bcrypt')
const userControllers = {
  dashboard: async (req, res) => {
    try {
      res.json({ message: "Successfully Enter Dashboard" });
    } catch (err) {
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
      const userExists=await User.findOne({email})
      // incase non it return to register
      if(!userExists)
      {
        res.json("Must Be Register")
      }
     // compare encrypt password to user give password
     const isPassword=await bcrypt.compare(password,User.password)



   
      res.json({ message: "Successfully Registered" }); 

    } catch (err) {
      console.log(err)
      res.status(400).json({ message: "Registration Not Work" });
    }
  },
 logout: (req, res) => {
    try {
      
      res.json({ message: "Successfully Logout" }); 
    } catch (err) {
      res.status(400).json({ message: "Logout Not Work" });
    }
  },
};

module.exports = userControllers;
