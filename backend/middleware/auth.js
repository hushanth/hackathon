const jwt=require("jsonwebtoken");
module.exports=(req,res,next)=>{
 const t=req.headers.authorization;
 if(!t)return res.status(401).json({msg:"No token"});
 try{req.user=jwt.verify(t,process.env.JWT_SECRET);next();}
 catch{res.status(401).json({msg:"Invalid"});}
};