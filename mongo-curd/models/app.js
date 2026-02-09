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
let app=express();
let frontendurl="http://localhost:5173"
app.use(cors({
  origin:frontendurl,
  methods:['GET','POST']
}));
app.use(express.json()); 

//socket.io connection-->

// const server=http.createServer(app)
// const io=new Server(server,{
//     cors:{
//         origin:'http://localhost:5173',
//         methods:['GET','POST'],
//         credentials:true
//     }
// });

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


//socket.io connection-->
// let users={};
// io.on("connection",(socket)=>{

// socket.on('register',(userid)=>{
// users[userid]=socket.id;
//     });



//   socket.on('private_message',async(data)=>{
//     console.log('next')
//     console.log(data.senderid)
//     console.log(data.getid)
    
//    let chat= await Convers.findOne({
//     participants:{$all:[data.senderid,data.getid]}
// });
//  console.log('hello')
// if(!chat){
//   chat=await Convers({
//         participants:[data.senderid,data.getid]
//     })
// }
// console.log(chat._id)
// let Chatmessage=await Message({
//     SenderId:data.senderid,
//     RecieverId:data.getid,
//     message:data.datas,
//     ConversationId:chat._id
// })
// if(Chatmessage){
// await chat.messages.push(Chatmessage._id);
// }
// await chat.save();
// await Chatmessage.save().then(()=>console.log(Chatmessage));


// const recieversocketid=users[data.getid];


// socket.emit('recieve_msg',Chatmessage)

// if(recieversocketid){
//   io.to(recieversocketid).emit('recieve_msg',Chatmessage)
   
// }
//   })  
// })





 app.listen(8000);

//  const io=require('socket.io')(server,{
//   cors:{
//     origin:frontendurl
//   }
// });




// io.on('connection',(socket)=>{
//   console.log('connected to socket.io');

//   socket.on('setup',(userData)=>{
//     socket.join(userData);
//     console.log(userData);
//     console.log('connected');
//   })

//     socket.on('join chat',(room)=>{
//     socket.join(room);
//     console.log('user joined '+room);
   
//   })
// })
