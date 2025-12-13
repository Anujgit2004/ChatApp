let express=require("express");
let mongoose=require("mongoose");
const route = require("./router");
 let dot= require("dotenv")
 dot.config();
const Adminaccess = require("./admin");
let {Server} =require("socket.io");
let {createServer}=require("http");
let cors=require("cors");
let app=express();
let frontendurl="http://localhost:5173"
app.use(cors({
  origin:frontendurl,
  methods:['GET','POST']
}));
app.use(express.json());
let server=createServer(app)
// const io=new Server(server,{
//     cors:{
//         origin:'http://localhost:5173',
//         methods:['GET','POST'],
//         credentials:true
//     }
// });
// io.on("connection",(socket)=>{
// socket.on('join room',(room)=>{
// socket.join(room);
// console.log(room+" joined")
//     })

//   socket.on('new message',(messagerecieved)=>{
//     socket.emit('new recieved',messagerecieved)
//   })  
// })



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
app.listen(8000);