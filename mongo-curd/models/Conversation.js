let mongoose=require("mongoose");

const conversationS=mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    ],
    messages:[{
         type:mongoose.Schema.Types.ObjectId,
            ref:'MessageT',
    }]
},{timestamps:true})
let Convers=mongoose.model('ConversationT',conversationS);
module.exports={Convers};