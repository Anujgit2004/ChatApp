let mongoose=require("mongoose");
let usermodel=mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true 
},
password:{
    type:String,
    required:true, 
},
profile:{
    type:String,
  default:''
},
role:{
 type:String,
required:true, 
}
})

let Userdata=mongoose.model("User",usermodel);

module.exports=Userdata;