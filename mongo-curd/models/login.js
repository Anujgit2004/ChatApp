const { Convers } = require("./Conversation");
const Generatetoken = require("./generatetoken");
const { Message } = require("./MessageSchema");
const Userdata = require("./user");
const bcrypt=require("bcrypt");
let mongoose=require("mongoose");
let getuser=null;
let getchaterid=null;
//login api
const userlogin=async(req,res)=>{
console.log(req)
let {email,password}=req.body;
let existinguser=await Userdata.findOne({email});
getuser=await existinguser;
if(!existinguser){
    res.json({message:"Not valid email"}) ;
}
let isavailable=await bcrypt.compare(password,existinguser.password);
if(!isavailable){
 res.json({message:"Not valid Password"}) ;
}
let token=Generatetoken(existinguser)
await res.json({token:token,name:existinguser})

console.log(getuser)
}

//signup api
const createuser=async(req,res)=>{
     try{
let {name,email,password}=req.body;
let getdata=await Userdata.findOne({email})
if(getdata?.email==email){
 res.json({message:"Registerd UnSuccessful"})
}
else{
let hashpass=await bcrypt.hash(password,10);
const finaluser=new Userdata({
    name:name,
    email:email,
    password:hashpass,
    role:"customer"
})
finaluser.save().then(async ()=>{
 let token=Generatetoken(finaluser)
 getuser= await Userdata.findOne({email})
 res.json({token:token,name:getuser});
 
})
}
    }
    catch(err){
console.log(err)
    }
console.log(getuser)
}


//dashboard api
const getprint=async(req,res)=>{
    let {names}=req.query;
let getalluser=await Userdata.find({
    name:{$regex:'.*'+names+'.*',$options:'i'}
}
).select('-password')
if(getalluser.length==0){
    return res.send("not found")
}
console.log(getuser)
res.send(getalluser);
}


const currentchatters=async(req,res)=>{
    try{
   let getchatters=await Convers.find({
        participants:getuser
    }).sort({
        updatedAt:1
    })
if(!getchatters||getchatters.length==0){
    return res.send("no conversation")
}
let getid=getchatters.map((v)=>{
   let party= v.participants.filter(id=>id.toString()!==getuser._id.toString());
   return [...party]
});

 let chattersdata=await Userdata.find({_id:{$in:getid}}).select("-password").select("-email")
 res.send(chattersdata)
 console.log(getuser)
    }
  catch(er){
res.send(er)
  }

}

//SendMessage api
const sendMessage=async(req,res)=>{
let {message}=req.body;
 let query= req.params  
let RecieverId=query.id;
let SenderId=query.ids;
let chat= await Convers.findOne({
    participants:{$all:[SenderId,RecieverId]}
});

if(!chat){
  chat=await new Convers({
        participants:[SenderId,RecieverId]
    })
}

let Chatmessage=new Message({
    SenderId,
    RecieverId,
    message,
    ConversationId:chat._id
})
res.send(Chatmessage)
if(Chatmessage){
await chat.messages.push(Chatmessage._id);
}
await chat.save();
await Chatmessage.save().then(()=>console.log(Chatmessage));
console.log(getuser)
}


//Recieve api
const recieveMessage=async(req,res)=>{
    console.log("sidhu");
    try { 
         let query= req.params  
      let RecieverId=query.id;
let SenderId=query.ids;
let getmessages=await Convers.findOne({
   participants:{$all:[RecieverId,SenderId]}
}).populate("messages")
res.send(getmessages.messages);  
    }
     catch (error) {
    //    res.json([])
    console.log(error)
    }

}

module.exports={userlogin,createuser,getprint,sendMessage,recieveMessage,currentchatters};