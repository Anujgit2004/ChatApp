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
image:{
    type:String,
required:true
},
role:{
 type:String,
default:''
}
})

let Userdata=mongoose.model("User",usermodel);

module.exports=Userdata;