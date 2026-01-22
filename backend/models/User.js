const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
 email:String,
 password:String,
 balance:{type:Number,default:12500},
 transactions:Array
});
module.exports=mongoose.model("User",userSchema);