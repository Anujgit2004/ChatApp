let express=require("express");

const {userlogin, getprint,createuser, sendMessage, recieveMessage, currentchatters} = require("./login");

let route=express.Router();
route.post("/register",createuser);
route.post("/login",userlogin);
route.get('/search',getprint)
route.get('/chatters',currentchatters);
route.post('/send/:id',sendMessage)
route.get('/:id',recieveMessage)

module.exports=route;