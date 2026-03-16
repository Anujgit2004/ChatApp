let express= require("express");
let http=require('http')
let mongoose=require("mongoose");
const {Server}=require('socket.io');
const route = require("./router");
const file=require('express-fileupload');
 let dot= require("dotenv")
 dot.config();
const Adminaccess = require("./admin");
let cors=require("cors");
const { Message } = require("./MessageSchema");
const { Convers } = require("./Conversation");
const fileUpload = require("express-fileupload");
let app=express();
let frontendurl="https://chatapp-frontend-nv7c.onrender.com/"
app.use(cors({
  origin:frontendurl,
  methods:['GET','POST']
})); 
app.use(express.json()); 
app.use(fileUpload({
  useTempFiles:true
}))
//socket.io connection--> 

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:frontendurl,
        methods:['GET','POST'],
        credentials:true
    }
});

let uri=process.env.URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch(err){
    console.log(err)
  }
} 
run().catch(console.dir);


app.get('/',(req,res)=>{
  res.send('Backend is running')
})
Adminaccess();
app.use("/user",route);
app.use("/auth",route)


//socket io to send message
io.on("connection",(socket)=>{
  socket.on("join",(userid)=>{
    socket.userid=userid;
    socket.join(userid);
    console.log(socket.id,userid)
  });


socket.on("Delete",async(user)=>{
let getmsg=await Message.findOne({_id:user.ids});
await getmsg.deletedFor.push(user.senderid);
await getmsg.save();
let getmessages=await Convers.findOne({
   participants:{$all:[user.getid,user.senderid]}
}).populate("messages")

socket.emit("loadmessage",(getmessages.messages))
})


  socket.on("private message",async(data)=>{
    let chat= await Convers.findOne({
    participants:{$all:[data.senderid,data.getid]}
});

if(!chat){
  chat=await new Convers({
        participants:[data.senderid,data.getid]
    })
}

let Chatmessage=new Message({
   SenderId:data.senderid,
   RecieverId:data.getid,
   message:data.datas.message,
    ConversationId:chat._id,
})

if(Chatmessage){
await chat.messages.push(Chatmessage._id);
}
await chat.save();
await Chatmessage.save().then(()=>console.log(Chatmessage));

io.to(data.getid).emit("private message",Chatmessage);
socket.emit("private message",Chatmessage)

  })
})



 server.listen(8000);

