let mongoose=require("mongoose");
let messageS=mongoose.Schema({
SenderId:{
      type:mongoose.Schema.Types.ObjectId,
               ref:'User',
               required:true
},
RecieverId:{
    type:mongoose.Schema.Types.ObjectId,
               ref:'User',
               required:true 
},
message:{
    type:String,
    required:true
},
ConversationId:{
      type:mongoose.Schema.Types.ObjectId,
               ref:'ConversationT',
               required:true
},
deletedFor:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User',
    default:[]
},
status:{
    type:String,
    default:'Sent'
}

},{timestamps:true})
const Message=mongoose.model("MessageT",messageS);
module.exports={Message};