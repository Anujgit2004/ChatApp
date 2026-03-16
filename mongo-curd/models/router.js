let express=require("express");

const {userlogin, getprint,createuser, recieveMessage, currentchatters, picupload} = require("./login");

let route=express.Router();
route.post("/register",createuser);
route.post("/login",userlogin);
route.get('/search',getprint)
route.get('/chatters',currentchatters);
route.get('/:id/:ids',recieveMessage)
route.post('/uploadpic',picupload)
module.exports=route;