const Userdata = require("./user");
let mongoose=require("mongoose");

async function Adminaccess(){
   
const admindata=await Userdata.findOne({email:"admin@gmail.com"});
if(admindata){
    console.log("Admin already registered");
}
else{
  let AdminD= await new Userdata({
        name:"admin",
        email:"admin@gmail.com",
        password:"admin@1234",
        role:"Admin"
    })
    AdminD.save().then(()=>console.log("Admin get registered...."))
}
}
module.exports=Adminaccess;