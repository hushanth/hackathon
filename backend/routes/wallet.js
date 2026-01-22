const r=require("express").Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const auth=require("../middleware/auth");

r.post("/login",async(req,res)=>{
 const {email,password}=req.body;
 let u=await User.findOne({email});
 if(!u){
  u=await User.create({email,password:await bcrypt.hash(password,10),
   transactions:[{type:"Initial Credit",amount:12500,date:new Date()}]});
 }
 if(!await bcrypt.compare(password,u.password))
  return res.status(400).json({msg:"Invalid"});
 res.json({token:jwt.sign({id:u._id},process.env.JWT_SECRET)});
});

r.get("/dashboard",auth,async(req,res)=>{
 const u=await User.findById(req.user.id);
 res.json({email:u.email,balance:u.balance,transactions:u.transactions,fraud:u.balance>50000});
});
module.exports=r;